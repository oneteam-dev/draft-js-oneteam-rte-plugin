import { ContentState, ContentBlock, Entity } from 'draft-js';
import getEntityRanges, { CharacterMetaList } from 'draft-js-utils/lib/getEntityRanges';
import urlRegex from 'url-regex';
import kebabCase from 'lodash/kebabCase';

import {
  BLOCK_TYPES, INLINE_STYLES, ENTITY_TYPES, OLD_INLINE_STYLES, OLD_BLOCK_TYPES
} from '../../constants';
import dataToAttr, { ENTITY_ATTR_MAP } from './helpers/dataToAttr';
import getTag from './helpers/getTag';
import getWrapperTag from './helpers/getWrapperTag';
import canHaveDepth from './helpers/canHaveDepth';
import encodeContent, { BREAK } from './helpers/encodeContent';
import { stringifyAttributes } from '../../helpers/dom';

import type { Options } from './types';

INLINE_STYLES.UNDERLINE = 'UNDERLINE';

const {
  BOLD,
  CODE,
  ITALIC,
  STRIKETHROUGH,
  UNDERLINE,
} = INLINE_STYLES;

const INDENT = '  ';

export default class MarkupGenerator {
  blocks: Array<ContentBlock>;
  contentState: ContentState;
  currentBlock: number;
  indentLevel: number;
  output: Array<string>;
  totalBlocks: number;
  wrapperTag: ?string;

  constructor(contentState: ContentState, options: ?Options = {}) {
    this.contentState = contentState;
    this.options = options;
  }

  generate(): string {
    this.output = [];
    this.blocks = this.contentState.getBlocksAsArray();
    this.totalBlocks = this.blocks.length;
    this.currentBlock = 0;
    this.indentLevel = 0;
    this.wrapperTag = null;
    while (this.currentBlock < this.totalBlocks) {
      this.processBlock();
    }
    this.closeWrapperTag();
    return this.output.join('').trim();
  }

  processBlock() {
    const { blockRenderers } = this.options;
    const block = this.blocks[this.currentBlock];
    const blockType = block.getType();
    const newWrapperTag = getWrapperTag(blockType);
    if (this.wrapperTag !== newWrapperTag) {
      if (this.wrapperTag) {
        this.closeWrapperTag();
      }
      if (newWrapperTag) {
        this.openWrapperTag(newWrapperTag);
      }
    }
    this.indent();

    // Allow blocks to be rendered using a custom renderer.
    const customRenderer = (blockRenderers != null && blockRenderers.hasOwnProperty(blockType)) ?
      blockRenderers[blockType] :
      null;
    const customRendererOutput = customRenderer ? customRenderer(block) : null;
    // Renderer can return null, which will cause processing to continue as normal.
    if (customRendererOutput != null) {
      this.output.push(customRendererOutput);
      this.output.push('\n');
      this.currentBlock += 1;
      return;
    }

    this.writeStartTag(blockType);
    this.output.push(this.renderBlockContent(block));
    // Look ahead and see if we will nest list.
    const nextBlock = this.getNextBlock();
    if (this.hasListBlock(blockType, nextBlock, block)) {
      this.output.push('\n');
      // This is a litle hacky: temporarily stash our current wrapperTag and
      // render child list(s).
      const thisWrapperTag = this.wrapperTag;
      this.wrapperTag = null;
      this.indentLevel += 1;
      this.currentBlock += 1;
      this.processBlocksAtDepth(nextBlock.getDepth());
      this.wrapperTag = thisWrapperTag;
      this.indentLevel -= 1;
      this.indent();
    } else {
      this.currentBlock += 1;
    }
    this.writeEndTag(blockType);
  }

  hasListBlock(blockType: string, nextBlock: ContentBlock, block: ContentBlock): boolean {
    return canHaveDepth(blockType) && !!nextBlock && nextBlock.getDepth() === block.getDepth() + 1;
  }

  processBlocksAtDepth(depth: number) {
    let block = this.blocks[this.currentBlock];
    while (block && block.getDepth() === depth) {
      this.processBlock();
      block = this.blocks[this.currentBlock];
    }
    this.closeWrapperTag();
  }

  getNextBlock(): ContentBlock {
    return this.blocks[this.currentBlock + 1];
  }

  writeStartTag(blockType) {
    const tag = getTag(blockType);
    switch (blockType) {
      case OLD_BLOCK_TYPES.ALIGN_RIGHT:
        this.output.push(`<${tag} style="text-align: right;">`);
        break;
      case OLD_BLOCK_TYPES.ALIGN_CENTER:
        this.output.push(`<${tag} style="text-align: center;">`);
        break;
      case OLD_BLOCK_TYPES.ALIGN_JUSTIFY:
        this.output.push(`<${tag} style="text-align: justify;">`);
        break;
      case BLOCK_TYPES.CHECKABLE_LIST_ITEM:
        this.output.push(`<${tag} class="task-list-item">`);
        break;
      default:
        this.output.push(`<${tag}>`);
    }
  }

  writeEndTag(blockType) {
    const tag = getTag(blockType);
    this.output.push(`</${tag}>\n`);
  }

  openWrapperTag(wrapperTag: string) {
    this.wrapperTag = wrapperTag;
    this.indent();
    this.output.push(`<${wrapperTag}>\n`);
    this.indentLevel += 1;
  }

  closeWrapperTag() {
    if (this.wrapperTag) {
      this.indentLevel -= 1;
      this.indent();
      this.output.push(`</${this.wrapperTag}>\n`);
      this.wrapperTag = null;
    }
  }

  indent() {
    this.output.push(INDENT.repeat(this.indentLevel));
  }

  renderBlockContent(block: ContentBlock): string {
    const blockType = block.getType();
    let blockText = block.getText();
    if (blockText === '') {
      // Prevent element collapse if completely empty.
      return BREAK;
    }
    blockText = this.preserveWhitespace(blockText);
    const charMetaList: CharacterMetaList = block.getCharacterList();
    const entityPieces = getEntityRanges(blockText, charMetaList);

    let ret = entityPieces.map(([entityKey, stylePieces]) => {
      const entity = entityKey ? Entity.get(entityKey) : null;
      const entityType = (entity == null) ? null : entity.getType();

      const content = stylePieces.map(([text, style]) => {
        // let encodedText = blockType === BLOCK_TYPES.CODE_BLOCK ? text : encodeContent(text);
        let encodedText = encodeContent(text);
        const originalEncodedText = encodedText;

        const oldStyles = style.toArray()
          .filter((s) => Object.keys(OLD_INLINE_STYLES).indexOf(s) !== -1);
        if (oldStyles.length > 0) {
          const styles = oldStyles.reduce((result, s) => (
            Object.keys(OLD_INLINE_STYLES[s]).reduce((r, prop) => {
              r[prop] = OLD_INLINE_STYLES[s][prop]; // eslint-disable-line no-param-reassign
              return r;
            }, result)
          ), {});

          const stringifyStyles = Object.keys(styles).map((prop) => {
            const val = prop === 'fontSize' ? `${styles[prop]}px` : styles[prop];
            return `${kebabCase(prop)}: ${val};`;
          }).join(' ');
          encodedText = `<span style="${stringifyStyles}">${encodedText}</span>`;
        }

        // These are reverse alphabetical by tag name.
        if (style.has(CODE)) {
          // If our block type is CODE then we are already wrapping the whole
          // block in a `<code>` so don't wrap inline code elements.
          encodedText = (blockType === BLOCK_TYPES.CODE_BLOCK) ? encodedText : `<code>${encodedText}</code>`;
        }
        if (style.has(BOLD)) {
          encodedText = `<strong>${encodedText}</strong>`;
        }
        if (style.has(UNDERLINE)) {
          encodedText = `<ins>${encodedText}</ins>`;
        }
        if (style.has(ITALIC)) {
          encodedText = `<em>${encodedText}</em>`;
        }
        if (style.has(STRIKETHROUGH)) {
          encodedText = `<del>${encodedText}</del>`;
        }
        if (entityType != null && entityType === ENTITY_TYPES.LINK) {
          const attrs = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? dataToAttr(entityType, entity) : null;
          const strAttrs = stringifyAttributes(attrs);
          encodedText = `<a${strAttrs} target="_blank">${encodedText}</a>`;
        } else if (urlRegex().test(originalEncodedText)) {
          encodedText = encodedText.replace(urlRegex(), (match) => `<a href="${match}" target="_blank">${match}</a>`);
        }
        return encodedText;
      }).join('');

      if (entityType != null && entityType === ENTITY_TYPES.DOWNLOAD_LINK) {
        const attrs = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? dataToAttr(entityType, entity) : null;
        return `<a href="${attrs.href}" target="_blank" data-name="${attrs.name}" data-size="${attrs.size}" download>${content}</a>`;
      } else if (entityType != null && (entityType === ENTITY_TYPES.IMAGE || entityType === 'IMG')) {
        const data = entity.getData();

        if (data.status && data.status !== 'completed') {
          return content;
        }
        const attrs = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? dataToAttr(entityType, entity) : null;
        return `<a href="${attrs.href || attrs.src}" target="_blank" class="uploaded-image">` +
          `<img src="${attrs.src}"${
            attrs.alt ? ` alt="${attrs.alt}"` : ''
          }${
            attrs.title ? ` title="${attrs.title}"` : ''
          }/>` +
        '</a>';
      } else if (entityType != null && entityType === ENTITY_TYPES.IFRAME) {
        const attrs = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? dataToAttr(entityType, entity) : null;
        const strAttrs = stringifyAttributes(attrs);
        return `<iframe${strAttrs}></iframe>`;
      } else if (entityType != null && entityType === ENTITY_TYPES.WEB_CARD) {
        const attrs = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? dataToAttr(entityType, entity) : null;
        const strAttrs = stringifyAttributes(attrs, ['url']);
        return `<web-card${strAttrs} />`;
      } else if (entityType != null && entityType === 'PLACEHOLDER') {
        const data = entity.getData();
        const isOriginalPDF = data.content_type === 'application/pdf';
        const srcData = !isOriginalPDF && data.thumbnails && data.thumbnails.preview ? data.thumbnails.preview : data;
        const widthAttr = srcData.width ? ` width="${srcData.width}"` : '';
        const heightAttr = srcData.height ? ` height="${srcData.height}"` : '';
        return `<pdf-preview src="${
          data[isOriginalPDF ? 'original_url' : 'preview_url']
        }" original-file-url="${
          data.download_url
        }" original-file-name="${
          data.name
        }" original-file-content-type="${
          data.content_type
        }"${widthAttr}${heightAttr}><a href="${
          data.download_url
        }" data-name="${
          data.name
        }" data-size="${
          data.size
        }" target="_blank" download>${data.name}</a></pdf-preview>`;
      } else if (entityType != null && entityType === 'FILE_PLACEHOLDER') {
        const data = entity.getData();

        if (data.status !== 'completed') {
          return content;
        }

        const child = `<a href="${
          data.download_url
        }" data-name="${
          data.name
        }" data-size="${
          data.size
        }" target="_blank" download>${data.name}</a>`;

        let filePlaceholder = `<file-placeholder url="${
          data.download_url
        }" name="${
          data.name
        }" size="${
          data.size
        }" content-type="${
          data.contentType
        }"${
          data.created_at ? ` uploaded-at="${data.created_at}"` : ''
        }${
          data.created_by ? ` uploaded-by="${data.created_by.name}"` : ''
        }>${child}</file-placeholder>`;

        const isOriginalPDF = data.content_type === 'application/pdf' || data.contentType === 'application/pdf';
        const isPdfPreview = isOriginalPDF ||
          (data.thumbnails && data.thumbnails.preview && data.thumbnails.preview.content_type === 'application/pdf');

        if (isPdfPreview) {
          const srcData = !isOriginalPDF && data.thumbnails && data.thumbnails.preview ? data.thumbnails.preview : data;
          const widthAttr = srcData.width ? ` width="${srcData.width}"` : '';
          const heightAttr = srcData.height ? ` height="${srcData.height}"` : '';

          filePlaceholder = `${filePlaceholder}<pdf-preview src="${
            data[isOriginalPDF ? 'original_url' : 'preview_url']
          }" original-file-url="${
            data.download_url
          }" original-file-name="${
            data.name
          }" original-file-content-type="${
            data.content_type
          }"${widthAttr}${heightAttr}></pdf-preview>`;
        }
        return filePlaceholder;
      }
      return content;
    }).join('');

    if (blockType === BLOCK_TYPES.CHECKABLE_LIST_ITEM) {
      const isChecked = block.getData().get('checked');
      ret = `<input type="checkbox"${isChecked ? ' checked ' : ' '}disabled /><span>${ret}</span>`;
    }

    return ret;
  }

  preserveWhitespace(text: string): string {
    const { length } = text;
    // Prevent leading/trailing/consecutive whitespace collapse.
    const newText = new Array(length);
    for (let i = 0; i < length; i += 1) {
      if (
        text[i] === ' ' &&
        (i === 0 || i === length - 1 || text[i - 1] === ' ')
      ) {
        newText[i] = '\xA0';
      } else {
        newText[i] = text[i];
      }
    }
    return newText.join('');
  }
}

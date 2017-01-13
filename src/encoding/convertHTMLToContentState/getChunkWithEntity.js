import { Entity } from 'draft-js';
import { CR } from './constants';
import { BLOCK_TYPES, ENTITY_TYPES } from '../../constants';
import { attributesToObject } from '../../helpers/dom';
import type { Chunk } from './types';

const getChunkWithEntity = (
  tagName: string,
  element: Element,
  inlineStyle: DraftInlineStyle,
  depth: number
): ?Chunk => {
  if (tagName === 'img') {
    const data = {
      src: element.src,
      alt: element.alt,
      'data-original-url': element.parentNode.getAttribute('href'),
    };
    const entityKey = Entity.create(ENTITY_TYPES.IMAGE, 'IMMUTABLE', data);
    return {
      text: `${CR} ${CR}`,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(entityKey),
      blocks: [{
        type: BLOCK_TYPES.ATOMIC,
        depth
      }, {
        type: BLOCK_TYPES.UNSTYLED,
        depth
      }]
    };
  }

  if (tagName === 'web-card') {
    const data = { url: element.getAttribute('url') };
    const hasImageremoved = element.hasAttribute('imageremoved');
    if (hasImageremoved) {
      data.imageRemoved = hasImageremoved;
    }
    const entityKey = Entity.create(ENTITY_TYPES.WEB_CARD, 'IMMUTABLE', data);
    return {
      text: `${CR} ${CR}`,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(entityKey),
      blocks: [{
        type: BLOCK_TYPES.ATOMIC,
        depth
      }, {
        type: BLOCK_TYPES.UNSTYLED,
        depth
      }]
    };
  }

  if (tagName === 'file-placeholder') {
    const url = element.getAttribute('url');
    const contentType = element.getAttribute('content-type');
    const data = {
      url,
      contentType,
      download_url: url,
      name: element.getAttribute('name'),
      created_at: element.getAttribute('uploaded-at'),
      created_by: {
        name: element.getAttribute('uploaded-by')
      },
      size: parseInt(element.getAttribute('size'), 10),
      content_type: contentType,
      status: 'completed'
    };
    if (element.parentNode.querySelectorAll('pdf-preview').length > 0) {
      const pdfPreview = element.parentNode.querySelector('pdf-preview');
      const src = pdfPreview.getAttribute('src');
      data.preview_url = src;
      if (contentType === 'application/pdf') {
        data.original_url = src;
      } else {
        const width = pdfPreview.getAttribute('width');
        const height = pdfPreview.getAttribute('height');
        data.original_url = src;
        data.thumbnails = {
          preview: {
            width: width ? parseInt(width, 10) : undefined,
            height: height ? parseInt(height, 10) : undefined,
            content_type: 'application/pdf',
            url: src
          }
        };
      }
    }
    const entityKey = Entity.create('FILE_PLACEHOLDER', 'IMMUTABLE', data);
    return {
      text: `${CR} ${CR}`,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(entityKey),
      blocks: [{
        type: BLOCK_TYPES.ATOMIC,
        depth
      }, {
        type: BLOCK_TYPES.UNSTYLED,
        depth
      }]
    };
  }

  if (tagName === 'pdf-preview' && element.parentNode.querySelectorAll('file-placeholder').length === 0) {
    const src = element.getAttribute('src');
    const contentType = element.getAttribute('original-file-content-type');
    const width = element.getAttribute('width');
    const height = element.getAttribute('height');
    const data = {
      download_url: element.getAttribute('original-file-url'),
      content_type: contentType,
      name: element.getAttribute('original-file-name'),
    };
    if (contentType === 'application/pdf') {
      data.original_url = src;
    } else {
      data.preview_url = src;
      data.thumbnails = {
        preview: {
          width: width ? parseInt(width, 10) : undefined,
          height: height ? parseInt(height, 10) : undefined,
          content_type: 'application/pdf',
          url: src,
        },
      };
    }
    const anchor = element.querySelector('a');
    const size = anchor ? parseInt(anchor.getAttribute('data-size'), 10) : null;
    if (size) {
      data.size = size;
    }

    const entityKey = Entity.create('PLACEHOLDER', 'IMMUTABLE', data);
    return {
      text: `${CR} ${CR}`,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(entityKey),
      blocks: [{
        type: BLOCK_TYPES.ATOMIC,
        depth
      }, {
        type: BLOCK_TYPES.UNSTYLED,
        depth
      }]
    };
  }

  if (tagName === 'iframe') {
    const entityKey = Entity.create(
      ENTITY_TYPES.IFRAME,
      'IMMUTABLE',
      { ...attributesToObject(element) }
    );
    return {
      text: `${CR} ${CR}`,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(entityKey),
      blocks: [{
        type: BLOCK_TYPES.ATOMIC,
        depth
      }, {
        type: BLOCK_TYPES.UNSTYLED,
        depth
      }]
    };
  }

  return null;
};

export default getChunkWithEntity;

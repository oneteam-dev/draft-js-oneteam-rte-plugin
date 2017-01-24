/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/* eslint-disable no-param-reassign */

import { Entity, ContentState, ContentBlock, CharacterMetadata, genKey } from 'draft-js';
import getSafeBodyFromHTML from 'draft-js/lib/getSafeBodyFromHTML';
import sanitizeDraftText from 'draft-js/lib/sanitizeDraftText';
import { List, OrderedSet, Map } from 'immutable';
import nullthrows from 'nullthrows';

import type { DraftInlineStyle } from 'draft-js/lib/DraftInlineStyle';

import getEmptyChunk from './getEmptyChunk';
import getWhitespaceChunk from './getWhitespaceChunk';
import getSoftNewlineChunk from './getSoftNewlineChunk';
import getBlockDividerChunk from './getBlockDividerChunk';
import getBlockTypeForTag from './getBlockTypeForTag';
import processInlineTag from './processInlineTag';
import joinChunks from './joinChunks';
import getChunkWithEntity from './getChunkWithEntity';
import normalizeHTML from './normalizeHTML';
import containsSemanticBlockMarkup from './helpers/containsSemanticBlockMarkup';
import shouldCreateLinkEntity from './helpers/shouldCreateLinkEntity';
import { SPACE, CR, REGEX_LF, BASE_BLOCK_TAG_NAMES } from './constants';
import { BLOCK_TYPES, ENTITY_TYPES } from '../../constants';

import type { Chunk } from './types';

let lastBlock;

const genFragment = (
  node: Node,
  inlineStyle: DraftInlineStyle,
  lastList: string,
  inBlock: ?string,
  blockTags: Array<string>,
  depth: number,
  inEntity?: string
): Chunk => {
  let nodeName = node.nodeName.toLowerCase();
  let newBlock = false;
  let nextBlockType = BLOCK_TYPES.UNSTYLED;
  const lastLastBlock = lastBlock;

  // Base Case
  if (nodeName === '#text') {
    let text = node.textContent;
    if (text.trim() === '' && inBlock !== 'pre') {
      return getWhitespaceChunk(inEntity);
    }
    if (inBlock !== 'pre') {
      // Can't use empty string because MSWord
      text = text.replace(REGEX_LF, SPACE);
    }

    // save the last block so we can use it later
    lastBlock = nodeName;

    return {
      text,
      inlines: Array(text.length).fill(inlineStyle),
      entities: Array(text.length).fill(inEntity),
      blocks: [],
    };
  }

  const chunkWithEntity = getChunkWithEntity(
    nodeName,
    node,
    inlineStyle,
    depth
  );

  if (chunkWithEntity) {
    return chunkWithEntity;
  }

  // save the last block so we can use it later
  lastBlock = nodeName;

  // BR tags
  if (nodeName === 'br') {
    if (
        lastLastBlock === 'br' &&
        (!inBlock || getBlockTypeForTag(inBlock, lastList, node) === BLOCK_TYPES.UNSTYLED)
    ) {
      return getBlockDividerChunk(BLOCK_TYPES.UNSTYLED, depth);
    }
    return getSoftNewlineChunk();
  }

  let chunk = getEmptyChunk();
  let newChunk: ?Chunk = null;

  // Inline tags
  inlineStyle = processInlineTag(nodeName, node, inlineStyle);

  // Handle lists
  if (nodeName === 'ul' || nodeName === 'ol') {
    if (lastList) {
      depth += 1;
    }
    lastList = nodeName;
  }

  // Block Tags
  if (!inBlock && blockTags.indexOf(nodeName) !== -1) {
    chunk = getBlockDividerChunk(
      getBlockTypeForTag(nodeName, lastList, node),
      depth,
      node
    );
    inBlock = nodeName;
    newBlock = true;
  } else if (lastList && inBlock === 'li' && nodeName === 'li') {
    chunk = getBlockDividerChunk(
      getBlockTypeForTag(nodeName, lastList, node),
      depth,
      node
    );
    inBlock = nodeName;
    newBlock = true;
    if (lastList === 'ul') {
      if (node.classList.contains('task-list-item')) {
        nextBlockType = BLOCK_TYPES.CHECKABLE_LIST_ITEM;
      } else {
        nextBlockType = BLOCK_TYPES.UNORDERED_LIST_ITEM;
      }
    } else {
      nextBlockType = BLOCK_TYPES.ORDERED_LIST_ITEM;
    }
  }

  // Recurse through children
  let child: ?Node = node.firstChild;
  if (child != null) {
    nodeName = child.nodeName.toLowerCase();
  }

  let entityId: ?string = null;
  let href: ?string = null;

  while (child) {
    if (shouldCreateLinkEntity(nodeName, child)) {
      // href = new URI(child.href).toString();
      href = child.href;
      if (child.hasAttribute('download')) {
        entityId = Entity.create(ENTITY_TYPES.DOWNLOAD_LINK, 'MUTABLE', {
          url: href,
          name: child.getAttribute('data-name'),
          size: child.getAttribute('data-size')
        });
      } else {
        entityId = Entity.create(ENTITY_TYPES.LINK, 'MUTABLE', { url: href });
      }
    } else {
      entityId = undefined;
    }

    newChunk = genFragment(
      child,
      inlineStyle,
      lastList,
      inBlock,
      blockTags,
      depth,
      entityId || inEntity
    );

    chunk = joinChunks(chunk, newChunk);
    const sibling: Node = child.nextSibling;

    // Put in a newline to break up blocks inside blocks
    if (
      sibling &&
      blockTags.indexOf(nodeName) >= 0 &&
      inBlock
    ) {
      chunk = joinChunks(chunk, getSoftNewlineChunk());
    }
    if (sibling) {
      nodeName = sibling.nodeName.toLowerCase();
    }
    child = sibling;
  }

  if (newBlock) {
    chunk = joinChunks(
      chunk,
      getBlockDividerChunk(nextBlockType, depth)
    );
  }

  return chunk;
};

const getChunkForHTML = (html: string, DOMBuilder: Function): ?Chunk => {
  html = normalizeHTML(html);

  const safeBody = DOMBuilder(html);
  if (!safeBody) {
    return null;
  }
  lastBlock = null;

  // Sometimes we aren't dealing with content that contains nice semantic
  // tags. In this case, use divs to separate everything out into paragraphs
  // and hope for the best.
  const workingBlocks = containsSemanticBlockMarkup(html) ? BASE_BLOCK_TAG_NAMES : ['div'];

  // Start with -1 block depth to offset the fact that we are passing in a fake
  // UL block to start with.
  let chunk =
    genFragment(safeBody, OrderedSet(), 'ul', null, workingBlocks, -1);

  // join with previous block to prevent weirdness on paste
  if (chunk.text.indexOf(CR) === 0) {
    chunk = {
      text: chunk.text.slice(1),
      inlines: chunk.inlines.slice(1),
      entities: chunk.entities.slice(1),
      blocks: chunk.blocks,
    };
  }

  // Kill block delimiter at the end
  if (chunk.text.slice(-1) === CR) {
    chunk.text = chunk.text.slice(0, -1);
    chunk.inlines = chunk.inlines.slice(0, -1);
    chunk.entities = chunk.entities.slice(0, -1);
    chunk.blocks.pop();
  }

  // If we saw no block tags, put an unstyled one in
  if (chunk.blocks.length === 0) {
    chunk.blocks.push({ type: BLOCK_TYPES.UNSTYLED, depth: 0 });
  }

  // Sometimes we start with text that isn't in a block, which is then
  // followed by blocks. Need to fix up the blocks to add in
  // an unstyled block for this content
  if (chunk.text.split(CR).length === chunk.blocks.length + 1) {
    chunk.blocks.unshift({ type: BLOCK_TYPES.UNSTYLED, depth: 0 });
  }

  return chunk;
};

const convertHTMLToContentState = (
  html: string,
  DOMBuilder: Function = getSafeBodyFromHTML
): ContentState => {
  // Be ABSOLUTELY SURE that the dom builder you pass hare won't execute
  // arbitrary code in whatever environment you're running this in. For an
  // example of how we try to do this in-browser, see getSafeBodyFromHTML.

  const chunk = getChunkForHTML(html, DOMBuilder);
  if (chunk == null) {
    return null;
  }
  let start = 0;

  const blockArray = chunk.text.split(CR).map(
    (textBlock, ii) => {
      // Make absolutely certain that our text is acceptable.
      textBlock = sanitizeDraftText(textBlock);
      const end = start + textBlock.length;
      const inlines = nullthrows(chunk).inlines.slice(start, end);
      const entities = nullthrows(chunk).entities.slice(start, end);
      const characterList = List(
        inlines.map((style, jj) => {
          const data = { style, entity: (null: ?string) };
          if (entities[jj]) {
            data.entity = entities[jj];
          }
          return CharacterMetadata.create(data);
        })
      );
      start = end + 1;

      return new ContentBlock({
        key: genKey(),
        type: nullthrows(chunk).blocks[ii].type,
        depth: nullthrows(chunk).blocks[ii].depth,
        data: nullthrows(chunk).blocks[ii].data || Map(),
        text: textBlock,
        characterList,
      });
    }
  );

  return ContentState.createFromBlockArray(blockArray);
};

export default convertHTMLToContentState;

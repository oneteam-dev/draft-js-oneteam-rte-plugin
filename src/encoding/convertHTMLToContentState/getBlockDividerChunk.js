import { OrderedSet, Map } from 'immutable';
import { CHECKABLE_LIST_ITEM } from 'draft-js-checkable-list-item';

import type { DraftBlockType } from 'draft-js/lib/DraftBlockType';

import { BLOCK_TYPES } from '../../constants';
import { CR, MAX_LIST_DEPTH } from './constants';

const hasCheckboxInput = (element: ?Element): boolean => {
  if (!element || !element.children) { return false; }
  return element.children[0].tagName === 'INPUT' && element.children[0].type === 'checkbox';
};

const getBlockDividerChunk = (
  block: DraftBlockType,
  depth: number,
  element: ?Element
): Chunk => { // eslint-disable-line
  const chunk = {
    text: CR,
    inlines: [OrderedSet()],
    entities: new Array(1),
    blocks: [{
      type: block,
      depth: Math.max(0, Math.min(MAX_LIST_DEPTH, depth)),
    }],
  };
  if (block === CHECKABLE_LIST_ITEM && hasCheckboxInput(element)) {
    chunk.blocks[0].data = Map({ checked: !!element.children[0].checked });
  }
  if (block === BLOCK_TYPES.CODE_BLOCK) {
    const language = element.getAttribute('data-language');
    if (language) {
      chunk.blocks[0].data = Map({ language });
    }
  }
  return chunk;
};

export default getBlockDividerChunk;

// @flow

import type { ContentBlock } from 'draft-js';

import { LIST_BLOCK_TYPES } from '../constants';

const isListBlock = (block: ContentBlock): boolean => {
  const type = block.getType();
  return LIST_BLOCK_TYPES.some((t) => t === type);
};

export default isListBlock;

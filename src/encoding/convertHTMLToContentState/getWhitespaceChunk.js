// @flow

import { OrderedSet } from 'immutable';

import type { Chunk } from './types';
import { SPACE } from './constants';

const getWhitespaceChunk = (inEntity: ?string): Chunk => {
  const entities = new Array(1);
  if (inEntity) {
    entities[0] = inEntity;
  }
  return {
    text: SPACE,
    inlines: [OrderedSet()],
    entities,
    blocks: [],
  };
};

export default getWhitespaceChunk;

// @flow

import type { Chunk } from './types';

const getEmptyChunk = (): Chunk => ({
  text: '',
  inlines: [],
  entities: [],
  blocks: []
});


export default getEmptyChunk;

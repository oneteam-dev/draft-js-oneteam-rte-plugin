import { OrderedSet } from 'immutable';
import { LF } from './constants';

import type { Chunk } from './types';

const getSoftNewlineChunk = (): Chunk => ({
  text: LF,
  inlines: [OrderedSet()],
  entities: new Array(1),
  blocks: [],
});

export default getSoftNewlineChunk;

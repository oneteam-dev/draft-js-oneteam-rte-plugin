import { CR, LF, SPACE } from './constants';

import type { Chunk } from './types';

const joinChunks = (A: Chunk, B: Chunk): Chunk => {
  // Sometimes two blocks will touch in the DOM and we need to strip the
  // extra delimiter to preserve niceness.
  const lastInA = A.text.slice(-1);
  const firstInB = B.text.slice(0, 1);

  if (
    lastInA === CR &&
    firstInB === CR
  ) {
    A.text = A.text.slice(0, -1); // eslint-disable-line no-param-reassign
    A.inlines.pop();
    A.entities.pop();
    A.blocks.pop();
  }

  // Kill whitespace after blocks
  if (
    lastInA === CR
  ) {
    if (B.text === SPACE) {
      return A;
    } else if (B.text === LF && A.text === CR) {
      return B;
    } else if (firstInB === SPACE || firstInB === LF) {
      B.text = B.text.slice(1); // eslint-disable-line no-param-reassign
      B.inlines.shift();
      B.entities.shift();
    }
  }

  return {
    text: A.text + B.text,
    inlines: A.inlines.concat(B.inlines),
    entities: A.entities.concat(B.entities),
    blocks: A.blocks.concat(B.blocks)
  };
};

export default joinChunks;

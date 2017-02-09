import { expect } from 'chai';

import getEmptyChunk from '../getEmptyChunk';
import joinChunks from '../joinChunks';
import { CR, SPACE } from '../constants';

// TODO: more tests
describe('joinChunks', () => {
  it('returns A', () => {
    const A = getEmptyChunk();
    const B = getEmptyChunk();
    A.text = CR;
    B.text = SPACE;
    const actual = joinChunks(A, B);
    expect(actual).to.equal(A);
  });
});

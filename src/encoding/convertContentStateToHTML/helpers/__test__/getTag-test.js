import { expect } from 'chai';
import getTag from '../getTag';
import { BLOCK_TYPES } from '../../../../constants';

describe('getTag', () => {
  it('Get html tag', () => {
    const actual = Object.keys(BLOCK_TYPES).map((k) => getTag(BLOCK_TYPES[k]));
    expect(actual).to.deep.equal([
      'div',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'blockquote',
      'li',
      'li',
      'figure',
      'pre',
      'li',
    ]);
  });
});

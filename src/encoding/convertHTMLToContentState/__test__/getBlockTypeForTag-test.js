import { expect } from 'chai';
import { BLOCK_TYPES } from '../../../constants';

import getBlockTypeForTag from '../getBlockTypeForTag';

describe('getBlockTypeForTag', () => {
  it('default', () => {
    const actual = getBlockTypeForTag('p');
    expect(actual).to.equal(BLOCK_TYPES.UNSTYLED);
  });
});

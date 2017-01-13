import { expect } from 'chai';
import { OrderedSet } from 'immutable';

import getWhitespaceChunk from '../getWhitespaceChunk';

describe('getWhitespaceChunk', () => {
  it('correct inEntity', () => {
    const actual = getWhitespaceChunk('someentity');
    expect(actual.text).to.equal(' ');
    expect(actual.inlines).to.have.lengthOf(1);
    expect(actual.inlines[0]).to.be.instanceof(OrderedSet);
    expect(actual.entities).to.have.lengthOf(1);
    expect(actual.entities[0]).to.equal('someentity');
    expect(actual.blocks).to.deep.equal([]);
  });
});

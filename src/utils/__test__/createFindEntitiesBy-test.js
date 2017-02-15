import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ContentBlock, CharacterMetadata } from 'draft-js';
import { List } from 'immutable';
import createFindEntitiesBy from '../createFindEntitiesBy';

chai.use(sinonChai);

describe('createFindEntitiesBy', () => {
  it('correct', () => {
    const findEntityRanges = createFindEntitiesBy('EXAMPLE');
    const block = new ContentBlock({ text: ' ', characterList: List([new CharacterMetadata()]) });
    const callback = sinon.spy();
    expect(findEntityRanges).to.be.a('function');
    findEntityRanges(block, callback);
    expect(callback.calledOnce).to.be.false();
  });
});

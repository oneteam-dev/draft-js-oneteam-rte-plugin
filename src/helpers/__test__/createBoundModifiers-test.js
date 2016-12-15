import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import createBoundModifiers from '../createBoundModifiers';

chai.use(sinonChai);

describe('createBoundModifiers', () => {
  let setEditorState;
  let getEditorState;
  afterEach(() => {
    createBoundModifiers.__ResetDependency__('modifiers');
  });
  it('returns bound modifiers', () => {
    setEditorState = sinon.spy();
    getEditorState = sinon.stub().returns('state0');
    const modifiers = { m1: () => 'newEditorState' };
    createBoundModifiers.__Rewire__('modifiers', modifiers);
    const store = { setEditorState, getEditorState };
    const actual = createBoundModifiers(store);
    actual.m1();
    expect(actual.m1).to.be.a('function');
    expect(setEditorState.calledOnce).to.be.true();
    expect(getEditorState.calledOnce).to.be.true();
  });
});

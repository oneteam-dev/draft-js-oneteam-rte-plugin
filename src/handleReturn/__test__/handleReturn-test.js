import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handleReturn from '..';

chai.use(sinonChai);

describe('handleReturn', () => {
  let getEditorState;
  let handleReturnWithCommand;
  let handleReturnListItem;
  let handleReturnToInsertWebCard;
  let handleReturnToSplitBlockIfCursorAtStart;
  const handlers = {
    handleReturnWithCommand,
    handleReturnListItem,
    handleReturnToInsertWebCard,
    handleReturnToSplitBlockIfCursorAtStart
  };

  afterEach(() => {
    Object.keys(handlers).forEach((key) => {
      handleReturn.__ResetDependency__(key);
    });
  });

  it('return not-handled with noop', () => {
    getEditorState = sinon.stub().returns('state0');

    Object.keys(handlers).forEach((key) => {
      handlers[key] = sinon.stub().returns(false);
      handleReturn.__Rewire__(key, handlers[key]);
    });

    const actual = handleReturn({})({}, { getEditorState });
    expect(getEditorState.calledOnce).to.be.true();
    expect(actual).to.equal('not-handled');
  });

  Object.keys(handlers).forEach((key) => {
    it(`return handled with ${key}`, () => {
      Object.keys(handlers).forEach((k) => {
        const returns = key === k;
        handlers[k] = sinon.stub().returns(returns);
        handleReturn.__Rewire__(k, handlers[k]);
      });

      getEditorState = sinon.stub().returns('state0');

      const actual = handleReturn({})({}, { getEditorState });
      expect(getEditorState.calledOnce).to.be.true();
      expect(actual).to.equal('handled');
    });
  });
});

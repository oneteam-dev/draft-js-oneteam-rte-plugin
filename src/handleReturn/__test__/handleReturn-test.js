import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import createEditorState from '../../__test__/helpers/createEditorState';
import handleReturn from '..';

chai.use(sinonChai);

describe('handleReturn', () => {
  let editorState;
  let handleReturnWithCommand;
  let handleReturnListItem;
  let handleReturnToInsertWebCard;
  let handleReturnToSplitBlockIfCursorAtStart;
  let handleReturnBlockquote;
  const handlers = {
    handleReturnWithCommand,
    handleReturnListItem,
    handleReturnToInsertWebCard,
    handleReturnToSplitBlockIfCursorAtStart,
    handleReturnBlockquote
  };

  beforeEach(() => {
    editorState = createEditorState();
  });

  afterEach(() => {
    Object.keys(handlers).forEach((key) => {
      handleReturn.__ResetDependency__(key);
    });
  });

  it('return not-handled with noop', () => {
    Object.keys(handlers).forEach((key) => {
      handlers[key] = sinon.stub().returns(false);
      handleReturn.__Rewire__(key, handlers[key]);
    });

    const actual = handleReturn({})({}, editorState, {});
    expect(actual).to.equal('not-handled');
  });

  Object.keys(handlers).forEach((key) => {
    it(`return handled with ${key}`, () => {
      Object.keys(handlers).forEach((k) => {
        const returns = key === k;
        handlers[k] = sinon.stub().returns(returns);
        handleReturn.__Rewire__(k, handlers[k]);
      });
      const actual = handleReturn({})({}, editorState, {});
      expect(actual).to.equal('handled');
    });
  });
});

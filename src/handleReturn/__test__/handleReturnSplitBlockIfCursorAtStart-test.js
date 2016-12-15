import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handleReturnToSplitBlockIfCursorAtStart from '../handleReturnToSplitBlockIfCursorAtStart';

chai.use(sinonChai);

describe('handleReturnToSplitBlockIfCursorAtStart', () => {
  let editorState;
  let setEditorState;
  let isCollapsed;
  let getStartOffset;
  let splitBlockInContentStateIfCursorAtStart;

  afterEach(() => {
    handleReturnToSplitBlockIfCursorAtStart.__ResetDependency__('splitBlockInContentStateIfCursorAtStart');
  });

  it('return false with noop', () => {
    isCollapsed = sinon.stub().returns(false);
    editorState = { getSelection: () => ({ isCollapsed }) };
    setEditorState = sinon.spy();
    splitBlockInContentStateIfCursorAtStart = sinon.spy();

    handleReturnToSplitBlockIfCursorAtStart.__Rewire__(
      'splitBlockInContentStateIfCursorAtStart',
      splitBlockInContentStateIfCursorAtStart
    );

    const actual = handleReturnToSplitBlockIfCursorAtStart(editorState, {}, { setEditorState });
    expect(setEditorState.called).to.be.false();
    expect(splitBlockInContentStateIfCursorAtStart.called).to.be.false();
    expect(actual).to.be.false();
  });
  it('return true with new editorState', () => {
    isCollapsed = sinon.stub().returns(true);
    getStartOffset = sinon.stub().returns(0);
    editorState = { getSelection: () => ({ isCollapsed, getStartOffset }) };
    setEditorState = sinon.spy();
    splitBlockInContentStateIfCursorAtStart = sinon.spy();

    handleReturnToSplitBlockIfCursorAtStart.__Rewire__(
      'splitBlockInContentStateIfCursorAtStart',
      splitBlockInContentStateIfCursorAtStart
    );

    const actual = handleReturnToSplitBlockIfCursorAtStart(editorState, {}, { setEditorState });
    expect(setEditorState.calledOnce).to.be.true();
    expect(splitBlockInContentStateIfCursorAtStart.calledOnce).to.be.true();
    expect(actual).to.be.true();
  });
});

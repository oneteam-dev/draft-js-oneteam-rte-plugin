import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handleReturnListItem from '../handleReturnListItem';

chai.use(sinonChai);

describe('handleReturnListItem', () => {
  let editorState;
  let setEditorState;
  let removeBlockStyle;
  let adjustBlockDepth;
  let isListBlock;
  let getCurrentBlock;
  let isCollapsed;

  const createGetCurrentBlock = (depth, length, key) => () => ({
    getDepth: () => depth,
    getLength: () => length,
    getKey: () => key
  });

  afterEach(() => {
    handleReturnListItem.__ResetDependency__('getCurrentBlock');
    handleReturnListItem.__ResetDependency__('isListBlock');
    handleReturnListItem.__ResetDependency__('removeBlockStyle');
    handleReturnListItem.__ResetDependency__('adjustBlockDepth');
  });

  it('return false with is not list block', () => {
    isCollapsed = sinon.stub().returns(true);
    editorState = { getSelection: () => ({ isCollapsed }) };
    setEditorState = sinon.spy();
    isListBlock = sinon.stub().returns(false);
    getCurrentBlock = createGetCurrentBlock();

    handleReturnListItem.__Rewire__('isListBlock', isListBlock);
    handleReturnListItem.__Rewire__('getCurrentBlock', getCurrentBlock);

    expect(setEditorState.called).to.be.false();
    expect(
      handleReturnListItem(editorState, {}, { setEditorState })
    ).to.be.false();
  });
  [0, 1].forEach((depth) => {
    it(`return true depth ${depth}`, () => {
      isListBlock = sinon.stub().returns(true);
      isCollapsed = sinon.stub().returns(true);
      editorState = { getSelection: () => ({ isCollapsed }) };
      setEditorState = sinon.spy();
      removeBlockStyle = sinon.stub().returns('newstate');
      adjustBlockDepth = sinon.stub().returns('newstate');
      getCurrentBlock = createGetCurrentBlock(depth, 0);

      handleReturnListItem.__Rewire__('isListBlock', isListBlock);
      handleReturnListItem.__Rewire__('getCurrentBlock', getCurrentBlock);
      handleReturnListItem.__Rewire__('removeBlockStyle', removeBlockStyle);
      handleReturnListItem.__Rewire__('adjustBlockDepth', adjustBlockDepth);

      const actual = handleReturnListItem(editorState, {}, { setEditorState });

      if (depth > 0) {
        expect(adjustBlockDepth.calledOnce).to.be.true();
      } else {
        expect(removeBlockStyle.calledOnce).to.be.true();
      }
      expect(setEditorState.calledOnce).to.be.true();
      expect(actual).to.be.true();
    });
  });
});

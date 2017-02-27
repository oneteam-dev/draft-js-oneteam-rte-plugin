import Draft from 'draft-js';
import { List, Repeat } from 'immutable';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handleReturnBlockquote from '../handleReturnBlockquote';

chai.use(sinonChai);

describe('handleReturnBlockquote', () => {
  let editorState;
  let setEditorState;
  let applyBlockData;
  let insertEmptyBlock;
  let getCurrentBlock;
  let event;

  const createGetCurrentBlock = (blockData) => {
    const _block = new Draft.ContentBlock(blockData);
    return () => _block;
  };

  afterEach(() => {
    handleReturnBlockquote.__ResetDependency__('getCurrentBlock');
    handleReturnBlockquote.__ResetDependency__('applyBlockData');
    handleReturnBlockquote.__ResetDependency__('insertEmptyBlock');
    handleReturnBlockquote.__ResetDependency__('RichUtils');
  });

  it('return false with is not blockquote', () => {
    editorState = {};
    setEditorState = sinon.spy();
    event = {};
    getCurrentBlock = createGetCurrentBlock({});

    handleReturnBlockquote.__Rewire__('getCurrentBlock', getCurrentBlock);

    expect(setEditorState.called).to.be.false();
    expect(
      handleReturnBlockquote(event, editorState, {}, { setEditorState })
    ).to.be.false();
  });
  it('return true with insert softnewline', () => {
    editorState = { getSelection: () => ({ isCollapsed: () => false, getStartOffset: () => 0 }) };
    setEditorState = sinon.spy();
    event = {};
    getCurrentBlock = createGetCurrentBlock({ type: 'blockquote' });

    const insertSoftNewline = sinon.spy();

    handleReturnBlockquote.__Rewire__('getCurrentBlock', getCurrentBlock);
    handleReturnBlockquote.__Rewire__('RichUtils', { insertSoftNewline });

    expect(
      handleReturnBlockquote(event, editorState, {}, { setEditorState })
    ).to.be.true();
    expect(setEditorState.called).to.be.true();
    expect(insertSoftNewline.called).to.be.true();
  });
  it('return true with apply block data and insert empty block', () => {
    const text = 'block quote\n';
    editorState = { getSelection: () => ({ isCollapsed: () => true, getStartOffset: () => text.length }) };
    setEditorState = sinon.spy();
    event = {};
    getCurrentBlock = createGetCurrentBlock({
      type: 'blockquote',
      text,
      characterList: List(Repeat(Draft.CharacterMetadata.EMPTY, text.length))
    });

    applyBlockData = sinon.spy();
    insertEmptyBlock = sinon.spy();

    handleReturnBlockquote.__Rewire__('getCurrentBlock', getCurrentBlock);
    handleReturnBlockquote.__Rewire__('applyBlockData', applyBlockData);
    handleReturnBlockquote.__Rewire__('insertEmptyBlock', insertEmptyBlock);

    expect(
      handleReturnBlockquote(event, editorState, {}, { setEditorState })
    ).to.be.true();
    expect(setEditorState.called).to.be.true();
    expect(applyBlockData.called).to.be.true();
    expect(insertEmptyBlock.called).to.be.true();
  });
});

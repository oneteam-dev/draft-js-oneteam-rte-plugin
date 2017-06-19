import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import createEditorState from '../../__test__/helpers/createEditorState';
import handleKeyCommand from '..';

chai.use(sinonChai);

describe('handleKeyCommand', () => {
  let RichUtilsHandleKeyCommand;
  let setEditorState;
  let editorState;
  const createGetCurrentBlock = (depth, length, key) => () => ({
    getDepth: () => depth,
    getLength: () => length,
    getKey: () => key
  });
  beforeEach(() => {
    editorState = createEditorState();
  });
  afterEach(() => {
    handleKeyCommand.__ResetDependency__('getCurrentBlock');
    handleKeyCommand.__ResetDependency__('isListBlock');
    handleKeyCommand.__ResetDependency__('removeBlockStyle');
    handleKeyCommand.__ResetDependency__('RichUtils');
  });
  it('is function', () => {
    const actual = handleKeyCommand({});
    expect(actual).to.be.a('function');
  });
  it('not-handled', () => {
    setEditorState = sinon.spy();
    const pluginFunctions = { setEditorState };
    const actual = handleKeyCommand({})('somecommand', editorState, pluginFunctions);
    expect(setEditorState.calledOnce).to.be.false();
    expect(actual).to.equal('not-handled');
  });
  it('handled for list block', () => {
    setEditorState = sinon.spy();
    const getCurrentBlock = createGetCurrentBlock(0, 0, 'item0');
    const isListBlock = sinon.stub().returns(true);
    const removeBlockStyle = sinon.stub().returns('newstate');
    const pluginFunctions = { setEditorState };

    handleKeyCommand.__Rewire__('getCurrentBlock', getCurrentBlock);
    handleKeyCommand.__Rewire__('isListBlock', isListBlock);
    handleKeyCommand.__Rewire__('removeBlockStyle', removeBlockStyle);

    const actual = handleKeyCommand({})('backspace', editorState, pluginFunctions);
    expect(setEditorState.calledOnce).to.be.true();
    expect(removeBlockStyle.calledOnce).to.be.true();
    expect(actual).to.equal('handled');
  });
  it('handled for first line', () => {
    editorState = createEditorState({
      entityMap: {},
      blocks: [{
        key: 'item0',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }]
    });
    setEditorState = sinon.spy();
    const getCurrentBlock = createGetCurrentBlock(0, 0, 'item0');
    const isListBlock = sinon.stub().returns(false);
    const removeBlockStyle = sinon.stub().returns('newstate');
    const pluginFunctions = { setEditorState };

    handleKeyCommand.__Rewire__('getCurrentBlock', getCurrentBlock);
    handleKeyCommand.__Rewire__('isListBlock', isListBlock);
    handleKeyCommand.__Rewire__('removeBlockStyle', removeBlockStyle);

    const actual = handleKeyCommand({})('backspace', editorState, pluginFunctions);
    expect(setEditorState.calledOnce).to.be.true();
    expect(removeBlockStyle.calledOnce).to.be.true();
    expect(actual).to.equal('handled');
  });
  it('handled for default', () => {
    setEditorState = sinon.spy();
    RichUtilsHandleKeyCommand = sinon.stub().returns('state1');
    const RichUtils = { handleKeyCommand: RichUtilsHandleKeyCommand };
    const pluginFunctions = { setEditorState };
    handleKeyCommand.__Rewire__('RichUtils', RichUtils);
    const actual = handleKeyCommand({})('somecommand', editorState, pluginFunctions);
    expect(setEditorState.calledOnce).to.be.true();
    expect(actual).to.equal('handled');
  });
});

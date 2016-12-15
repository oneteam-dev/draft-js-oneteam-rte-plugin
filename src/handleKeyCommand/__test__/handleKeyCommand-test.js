import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handleKeyCommand from '..';

chai.use(sinonChai);

describe('handleKeyCommand', () => {
  let RichUtilsHandleKeyCommand;
  let getEditorState;
  let setEditorState;
  const createGetCurrentBlock = (depth, length, key) => () => ({
    getDepth: () => depth,
    getLength: () => length,
    getKey: () => key
  });
  afterEach(() => {
    handleKeyCommand.__ResetDependency__('getCurrentBlock');
    handleKeyCommand.__ResetDependency__('isListBlock');
    handleKeyCommand.__ResetDependency__('removeBlockStyle');
  });
  it('is function', () => {
    const actual = handleKeyCommand({});
    expect(actual).to.be.a('function');
  });
  it('not-handled', () => {
    getEditorState = sinon.spy();
    setEditorState = sinon.spy();
    const pluginFunctions = { getEditorState };
    const actual = handleKeyCommand({})('somecommand', pluginFunctions);
    expect(setEditorState.calledOnce).to.be.false();
    expect(actual).to.equal('not-handled');
  });
  it('handled for list block', () => {
    getEditorState = sinon.spy();
    setEditorState = sinon.spy();
    const getCurrentBlock = createGetCurrentBlock(0, 0, 'item0');
    const isListBlock = sinon.stub().returns(true);
    const removeBlockStyle = sinon.stub().returns('newstate');
    const pluginFunctions = { getEditorState, setEditorState };

    handleKeyCommand.__Rewire__('getCurrentBlock', getCurrentBlock);
    handleKeyCommand.__Rewire__('isListBlock', isListBlock);
    handleKeyCommand.__Rewire__('removeBlockStyle', removeBlockStyle);

    const actual = handleKeyCommand({})('backspace', pluginFunctions);
    expect(setEditorState.calledOnce).to.be.true();
    expect(removeBlockStyle.calledOnce).to.be.true();
    expect(actual).to.equal('handled');
  });
  it('handled for first line', () => {
    const KEY = 'item0';
    const editorState = {
      getCurrentContent: () => ({ getFirstBlock: () => ({ getKey: () => KEY }) })
    };
    getEditorState = sinon.stub().returns(editorState);
    setEditorState = sinon.spy();
    const getCurrentBlock = createGetCurrentBlock(0, 0, 'item0');
    const isListBlock = sinon.stub().returns(false);
    const removeBlockStyle = sinon.stub().returns('newstate');
    const pluginFunctions = { getEditorState, setEditorState };

    handleKeyCommand.__Rewire__('getCurrentBlock', getCurrentBlock);
    handleKeyCommand.__Rewire__('isListBlock', isListBlock);
    handleKeyCommand.__Rewire__('removeBlockStyle', removeBlockStyle);

    const actual = handleKeyCommand({})('backspace', pluginFunctions);
    expect(setEditorState.calledOnce).to.be.true();
    expect(removeBlockStyle.calledOnce).to.be.true();
    expect(actual).to.equal('handled');
  });
  it('handled for default', () => {
    setEditorState = sinon.spy();
    getEditorState = sinon.stub().returns('state0');
    RichUtilsHandleKeyCommand = sinon.stub().returns('state1');
    const RichUtils = { handleKeyCommand: RichUtilsHandleKeyCommand };
    const pluginFunctions = { getEditorState, setEditorState };
    handleKeyCommand.__Rewire__('RichUtils', RichUtils);
    const actual = handleKeyCommand({})('somecommand', pluginFunctions);
    expect(setEditorState.calledOnce).to.be.true();
    expect(actual).to.equal('handled');
  });
});

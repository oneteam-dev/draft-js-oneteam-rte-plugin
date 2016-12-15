import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handleTabToInsertIndent from '../handleTabToInsertIndent';

chai.use(sinonChai);

describe('handleTabToInsertIndent', () => {
  const editorState = 'state';
  let insertIndent;
  let event;
  let preventDefault;
  let setEditorState;
  let pluginFunctions;
  afterEach(() => {
    preventDefault.reset();
    setEditorState.reset();
    handleTabToInsertIndent.__ResetDependency__('insertIndent');
  });
  it('handled', () => {
    preventDefault = sinon.spy();
    event = { preventDefault };
    setEditorState = sinon.spy();
    pluginFunctions = { getEditorState: () => editorState, setEditorState };
    insertIndent = sinon.stub().returns(0);
    handleTabToInsertIndent.__Rewire__('insertIndent', insertIndent);
    handleTabToInsertIndent(event, pluginFunctions);
    expect(preventDefault.calledOnce).to.be.true();
    expect(setEditorState.calledOnce).to.be.true();
  });
  it('not-handled', () => {
    preventDefault = sinon.spy();
    event = { preventDefault };
    setEditorState = sinon.spy();
    pluginFunctions = { getEditorState: () => editorState, setEditorState };
    insertIndent = sinon.stub().returns(editorState);
    handleTabToInsertIndent.__Rewire__('insertIndent', insertIndent);
    handleTabToInsertIndent(event, pluginFunctions);
    expect(preventDefault.called).to.be.false();
    expect(setEditorState.called).to.be.false();
  });
});

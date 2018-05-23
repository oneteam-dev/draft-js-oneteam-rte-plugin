import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handleTabToInsertIndent from '../handleTabToInsertIndent';

chai.use(sinonChai);

describe('handleTabToInsertIndent', () => {
  const editorState = 'state';
  let insertIndent;
  let event;
  let pluginFunctions;
  afterEach(() => {
    handleTabToInsertIndent.__ResetDependency__('insertIndent');
  });
  it('handled', () => {
    const preventDefault = sinon.spy();
    const setEditorState = sinon.spy();
    event = { preventDefault };
    pluginFunctions = { getEditorState: () => editorState, setEditorState };
    insertIndent = sinon.stub().returns(0);
    handleTabToInsertIndent.__Rewire__('insertIndent', insertIndent);
    handleTabToInsertIndent(event, pluginFunctions);
    expect(preventDefault.calledOnce).to.be.true();
    expect(setEditorState.calledOnce).to.be.true();
  });
  it('not-handled', () => {
    const preventDefault = sinon.spy();
    const setEditorState = sinon.spy();
    event = { preventDefault };
    pluginFunctions = { getEditorState: () => editorState, setEditorState };
    insertIndent = sinon.stub().returns(editorState);
    handleTabToInsertIndent.__Rewire__('insertIndent', insertIndent);
    handleTabToInsertIndent(event, pluginFunctions);
    expect(preventDefault.called).to.be.false();
    expect(setEditorState.called).to.be.false();
  });
});

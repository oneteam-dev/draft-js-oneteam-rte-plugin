import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import onTab from '..';

chai.use(sinonChai);

describe('onTab', () => {
  const event = {};
  let handleTabToInsertIndent;
  let getEditorState;
  let setEditorState;
  let RichUtilsOnTab;
  afterEach(() => {
    onTab.__ResetDependency__('handleTabToInsertIndent');
    onTab.__ResetDependency__('RichUtils');
  });
  it('is function', () => {
    const actual = onTab({});
    expect(actual).to.be.a('function');
  });
  it('noop', () => {
    getEditorState = sinon.spy();
    const pluginFunctions = { getEditorState };
    handleTabToInsertIndent = sinon.stub().returns(true);
    onTab.__Rewire__('handleTabToInsertIndent', handleTabToInsertIndent);
    onTab({})(event, pluginFunctions);
    expect(getEditorState.called).to.be.false();
  });
  it('handled', () => {
    setEditorState = sinon.spy();
    getEditorState = sinon.stub().returns('state0');
    RichUtilsOnTab = sinon.stub().returns('state1');
    handleTabToInsertIndent = sinon.stub().returns(false);
    const RichUtils = { onTab: RichUtilsOnTab };
    const pluginFunctions = { getEditorState, setEditorState };
    onTab.__Rewire__('handleTabToInsertIndent', handleTabToInsertIndent);
    onTab.__Rewire__('RichUtils', RichUtils);
    onTab({})(event, pluginFunctions);
    expect(setEditorState.calledOnce).to.be.true();
  });
});

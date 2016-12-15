import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handlePastedText from '..';

chai.use(sinonChai);

describe('handlePastedText', () => {
  let getEditorState;
  let setEditorState;
  let insertText;
  let insertWebCards;

  it('is function', () => {
    const actual = handlePastedText();
    expect(actual).to.be.a('function');
  });
  beforeEach(() => {
    getEditorState = sinon.stub().returns('state0');
    setEditorState = sinon.spy();
    insertText = sinon.spy();
    insertWebCards = sinon.spy();

    handlePastedText.__Rewire__('insertText', insertText);
    handlePastedText.__Rewire__('insertWebCards', insertWebCards);
  });
  afterEach(() => {
    handlePastedText.__ResetDependency__('insertText');
    handlePastedText.__ResetDependency__('insertWebCards');
  });
  it('not-handled', () => {
    const pluginFunctions = { getEditorState };
    const actual = handlePastedText()(null, null, pluginFunctions);
    expect(actual).to.equal('not-handled');
  });
  it('not-handled not including url', () => {
    const actual = handlePastedText()('Not including url', null, { getEditorState, setEditorState });
    expect(actual).to.equal('not-handled');
    expect(getEditorState.calledOnce).to.be.false();
    expect(setEditorState.calledOnce).to.be.false();
    expect(insertText.calledOnce).to.be.false();
    expect(insertWebCards.calledOnce).to.be.false();
  });
  ['https://one-team.com', 'https://one-team.com Text https://two-team.com'].forEach((text) => {
    it(`handled for ${text}`, () => {
      const actual = handlePastedText()(text, null, { getEditorState, setEditorState });
      expect(actual).to.equal('handled');
      expect(getEditorState.calledOnce).to.be.true();
      expect(setEditorState.calledOnce).to.be.true();
      expect(insertText.calledOnce).to.be.true();
      expect(insertWebCards.calledOnce).to.be.true();
    });
  });
});

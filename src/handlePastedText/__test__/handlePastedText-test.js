import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handlePastedText from '..';
import createEditorState from '../../__test__/helpers/createEditorState';

chai.use(sinonChai);

describe('handlePastedText', () => {
  let getEditorState;
  let setEditorState;
  let processText;
  let insertText;
  let insertWebCards;
  let editorState;

  it('is function', () => {
    const actual = handlePastedText();
    expect(actual).to.be.a('function');
  });
  beforeEach(() => {
    setEditorState = sinon.spy();
    processText = sinon.spy();
    insertText = sinon.spy();
    insertWebCards = sinon.spy();

    handlePastedText.__Rewire__('processText', processText);
    handlePastedText.__Rewire__('insertText', insertText);
    handlePastedText.__Rewire__('insertWebCards', insertWebCards);
  });
  afterEach(() => {
    handlePastedText.__ResetDependency__('processText');
    handlePastedText.__ResetDependency__('insertText');
    handlePastedText.__ResetDependency__('insertWebCards');
  });
  it('not-handled', () => {
    editorState = createEditorState(
      {
        entityMap: {},
        blocks: [{
          key: 'item1',
          text: 'Text',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }]
      },
      {
        anchorKey: 'item1',
        anchorOffset: 0,
        focusKey: 'item1',
        focusOffset: 0,
        isBackward: false,
        hasFocus: true
      }
    );
    getEditorState = sinon.stub().returns(editorState);
    const pluginFunctions = { getEditorState };
    const actual = handlePastedText()(null, null, pluginFunctions);
    expect(getEditorState.calledOnce).to.be.false();
    expect(setEditorState.calledOnce).to.be.false();
    expect(actual).to.equal('not-handled');
  });
  it('not-handled not including url', () => {
    editorState = createEditorState(
      {
        entityMap: {},
        blocks: [{
          key: 'item1',
          text: 'Text',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }]
      },
      {
        anchorKey: 'item1',
        anchorOffset: 0,
        focusKey: 'item1',
        focusOffset: 0,
        isBackward: false,
        hasFocus: true
      }
    );
    getEditorState = sinon.stub().returns(editorState);
    const actual = handlePastedText()('Not including url', null, { getEditorState, setEditorState });
    expect(actual).to.equal('not-handled');
    expect(getEditorState.calledOnce).to.be.true();
    expect(setEditorState.calledOnce).to.be.false();
    expect(insertText.calledOnce).to.be.false();
    expect(insertWebCards.calledOnce).to.be.false();
  });
  ['https://one-team.com', 'https://one-team.com Text https://two-team.com'].forEach((text) => {
    it(`handled for \`${text}\``, () => {
      editorState = createEditorState(
        {
          entityMap: {},
          blocks: [{
            key: 'item1',
            text: 'Text',
            type: 'unstyled',
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {}
          }]
        },
        {
          anchorKey: 'item1',
          anchorOffset: 0,
          focusKey: 'item1',
          focusOffset: 0,
          isBackward: false,
          hasFocus: true
        }
      );
      getEditorState = sinon.stub().returns(editorState);
      const actual = handlePastedText()(text, null, { getEditorState, setEditorState });
      expect(actual).to.equal('handled');
      expect(getEditorState.calledOnce).to.be.true();
      expect(setEditorState.calledOnce).to.be.true();
      expect(processText.calledOnce).to.be.true();
      expect(insertText.calledOnce).to.be.false();
      expect(insertWebCards.calledOnce).to.be.true();
    });
  });
  it('handled block type is CODE_BLOCK', () => {
    editorState = createEditorState(
      {
        entityMap: {},
        blocks: [{
          key: 'item1',
          text: 'Text',
          type: 'code-block',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }]
      },
      {
        anchorKey: 'item1',
        anchorOffset: 0,
        focusKey: 'item1',
        focusOffset: 0,
        isBackward: false,
        hasFocus: true
      }
    );
    getEditorState = sinon.stub().returns(editorState);
    const actual = handlePastedText()('https://one-team.com', null, { getEditorState, setEditorState });
    expect(actual).to.equal('handled');
    expect(getEditorState.calledOnce).to.be.true();
    expect(setEditorState.calledOnce).to.be.true();
    expect(insertText.calledOnce).to.be.true();
  });
});

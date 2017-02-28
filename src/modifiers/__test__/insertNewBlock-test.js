import { expect } from 'chai';
import sinon from 'sinon';
import Draft, { EditorState, SelectionState } from 'draft-js';
import insertNewBlock from '../insertNewBlock';

describe('insertNewBlock', () => {
  const defaultBlockData = {
    type: 'unstyled',
    text: '',
    depth: 0,
    entityRanges: [],
    inlineStyleRanges: [],
    data: {}
  };
  before(() => {
    sinon.stub(Draft, 'genKey').returns('item2');
  });
  after(() => {
    Draft.genKey.restore();
  });
  const testInsertEmptyBlock = (args = {}) => () => {
    const firstBlock = {
      key: 'item1',
      text: 'asdf',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [{
        length: 2,
        offset: 1,
        style: 'ITALIC'
      }],
      entityRanges: [],
      data: { foo: 'bar' }
    };
    const beforeRawContentState = {
      entityMap: {},
      blocks: [firstBlock]
    };
    const afterRawContentState = {
      entityMap: {},
      blocks: [
        firstBlock,
        {
          key: 'item2',
          ...defaultBlockData,
          ...args
        }
      ]
    };
    const contentState = Draft.convertFromRaw(beforeRawContentState);
    const selection = new SelectionState({
      anchorKey: 'item1',
      anchorOffset: 4,
      focusKey: 'item1',
      focusOffset: 4,
      isBackward: false,
      hasFocus: true
    });
    const editorState = EditorState.forceSelection(
      EditorState.createWithContent(contentState), selection);

    it('creates new block', () => {
      const { type, text, characterList, data } = args;
      const newEditorState = insertNewBlock(editorState, type, text, characterList, data);
      expect(newEditorState).not.to.equal(editorState);
      expect(
        Draft.convertToRaw(newEditorState.getCurrentContent())
      ).to.deep.equal(
        afterRawContentState
      );
    });
  };

  describe('with arguments', testInsertEmptyBlock({ type: 'header-one', data: { bar: 'baz' } }));
  describe('without arguments', testInsertEmptyBlock());
});

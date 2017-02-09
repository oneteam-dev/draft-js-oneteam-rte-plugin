import { expect } from 'chai';
import Draft, { EditorState, SelectionState } from 'draft-js';
import getCurrentBlock from '../../utils/getCurrentBlock';
import removeBlock from '../removeBlock';

describe('removeBlock', () => {
  const selection = new SelectionState({
    anchorKey: 'item1',
    anchorOffset: 0,
    focusKey: 'item1',
    focusOffset: 0,
    isBackward: false,
    hasFocus: true
  });
  const createEditorState = (rawContentState) => {
    const contentState = Draft.convertFromRaw(rawContentState);
    return EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selection
    );
  };
  it('Remove current block', () => {
    const beforeRawContentState = {
      entityMap: {},
      blocks: [{
        key: 'item1',
        text: 'Text',
        type: 'header-one',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      },
      {
        key: 'item2',
        text: 'B',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }]
    };
    const editorState = createEditorState(beforeRawContentState);
    const newEditorState = removeBlock(editorState, getCurrentBlock(editorState));
    expect(newEditorState).not.to.equal(editorState);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      expected
    ).to.deep.equal({
      entityMap: {},
      blocks: [{
        key: 'item1',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }, {
        key: 'item2',
        text: 'B',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }]
    });
  });
});

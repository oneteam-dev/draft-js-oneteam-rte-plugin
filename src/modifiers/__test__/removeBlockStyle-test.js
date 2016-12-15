import { expect } from 'chai';
import Draft, { EditorState, SelectionState } from 'draft-js';

import removeBlockStyle from '../removeBlockStyle';

describe('removeBlockStyle', () => {
  const createEditorState = (rawContentState, selection) => {
    const contentState = Draft.convertFromRaw(rawContentState);
    return EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selection
    );
  };

  it('remove block style', () => {
    const selection = new SelectionState({
      anchorKey: 'item1',
      anchorOffset: 0,
      focusKey: 'item1',
      focusOffset: 0,
      isBackward: false,
      hasFocus: true
    });
    const editorState = createEditorState(
      {
        entityMap: {},
        blocks: [{
          key: 'item1',
          text: '',
          type: 'header-one',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }]
      },
      selection
    );
    const newEditorState = removeBlockStyle(editorState);
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
      }]
    });
  });
  it('noop', () => {
    const selection = new SelectionState({
      anchorKey: 'item1',
      anchorOffset: 0,
      focusKey: 'item1',
      focusOffset: 1,
      isBackward: false,
      hasFocus: true
    });
    const editorState = createEditorState(
      {
        entityMap: {},
        blocks: [{
          key: 'item1',
          text: '',
          type: 'header-one',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }]
      },
      selection
    );
    const newEditorState = removeBlockStyle(editorState);
    expect(newEditorState).to.equal(editorState);
  });
});

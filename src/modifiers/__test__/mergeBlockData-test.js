import { expect } from 'chai';
import Draft, { EditorState, SelectionState } from 'draft-js';

import mergeBlockData from '../mergeBlockData';

describe('mergeBlockData', () => {
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
  it('Merge block metadata', () => {
    const beforeRawContentState = {
      entityMap: {},
      blocks: [{
        key: 'item1',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: { foo: 1, bar: 2 }
      }]
    };
    const editorState = createEditorState(beforeRawContentState);
    const newEditorState = mergeBlockData(editorState, 'item1', { foo: 3, baz: 4 });
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
        data: { foo: 3, bar: 2, baz: 4 }
      }]
    });
  });
});

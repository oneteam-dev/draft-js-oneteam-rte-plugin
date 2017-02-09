import { expect } from 'chai';
import Draft, { EditorState, SelectionState } from 'draft-js';
import omitBlocksKeyFromContentState from './helpers/omitBlocksKeyFromContentState';

import toggleInlineStyle from '../toggleInlineStyle';

describe('toggleInlineStyle', () => {
  const beforeRawContentState = {
    entityMap: {},
    blocks: [{
      key: 'item1',
      text: 'Text',
      type: 'header-one',
      depth: 0,
      inlineStyleRanges: [{
        length: 2,
        offset: 1,
        style: 'ITALIC'
      }],
      entityRanges: [],
      data: {}
    }]
  };

  const afterRawContentState = {
    entityMap: {},
    blocks: [
      {
        key: 'item1',
        text: 'Text',
        type: 'header-one',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }
    ]
  };
  const selection = new SelectionState({
    anchorKey: 'item1',
    anchorOffset: 1,
    focusKey: 'item1',
    focusOffset: 3,
    isBackward: false,
    hasFocus: true
  });
  const contentState = Draft.convertFromRaw(beforeRawContentState);
  const editorState = EditorState.forceSelection(
    EditorState.createWithContent(contentState),
    selection
  );
  it('toggle', () => {
    const newEditorState = toggleInlineStyle(editorState, 'ITALIC');
    expect(newEditorState).not.to.equal(editorState);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      // TODO: Block key is generatd random
      omitBlocksKeyFromContentState(expected)
    ).to.deep.equal(
      // TODO: Block key is generatd random
      omitBlocksKeyFromContentState(afterRawContentState)
    );
  });
});

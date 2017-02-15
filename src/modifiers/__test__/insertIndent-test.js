import { expect } from 'chai';
import Draft from 'draft-js';
import createEditorState from '../../__test__/helpers/createEditorState';

import insertIndent from '../insertIndent';

describe('insertIndent', () => {
  const afterRawContentState = {
    entityMap: {},
    blocks: [{
      key: 'item1',
      text: '    ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }]
  };
  const rawSelectionState = {
    anchorKey: 'item1',
    anchorOffset: 0,
    focusKey: 'item1',
    focusOffset: 0,
    isBackward: false,
    hasFocus: true
  };
  it('noop', () => {
    const beforeRawContentState = {
      entityMap: {},
      blocks: [{
        key: 'item1',
        text: '',
        type: 'unordered-list-item',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }]
    };
    const editorState = createEditorState(beforeRawContentState, rawSelectionState);
    const newEditorState = insertIndent(editorState);
    expect(newEditorState).to.equal(editorState);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      expected
    ).to.deep.equal(
      beforeRawContentState
    );
  });
  it('insert indent', () => {
    const beforeRawContentState = {
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
    };
    const editorState = createEditorState(beforeRawContentState, rawSelectionState);
    const newEditorState = insertIndent(editorState);
    expect(newEditorState).not.to.equal(editorState);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      expected
    ).to.deep.equal(
      afterRawContentState
    );
  });
});

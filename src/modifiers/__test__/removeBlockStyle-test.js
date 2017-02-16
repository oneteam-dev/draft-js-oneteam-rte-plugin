import { expect } from 'chai';
import Draft from 'draft-js';
import createEditorState from '../../__test__/helpers/createEditorState';

import removeBlockStyle from '../removeBlockStyle';

describe('removeBlockStyle', () => {
  it('remove block style', () => {
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
      {
        anchorKey: 'item1',
        anchorOffset: 0,
        focusKey: 'item1',
        focusOffset: 0,
        isBackward: false,
        hasFocus: true
      }
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
      {
        anchorKey: 'item1',
        anchorOffset: 0,
        focusKey: 'item1',
        focusOffset: 1,
        isBackward: false,
        hasFocus: true
      }
    );
    const newEditorState = removeBlockStyle(editorState);
    expect(newEditorState).to.equal(editorState);
  });
});

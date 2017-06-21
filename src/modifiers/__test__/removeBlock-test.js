import { expect } from 'chai';
import Draft from 'draft-js';
import getCurrentBlock from 'draft-js-modifiers/utils/getCurrentBlock';
import createEditorState from '../../__test__/helpers/createEditorState';

import removeBlock from '../removeBlock';

describe('removeBlock', () => {
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
    const rawSelectionState = {
      anchorKey: 'item1',
      anchorOffset: 0,
      focusKey: 'item1',
      focusOffset: 0,
      isBackward: false,
      hasFocus: true
    };
    const editorState = createEditorState(beforeRawContentState, rawSelectionState);
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

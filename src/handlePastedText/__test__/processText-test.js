import { expect } from 'chai';
import Draft from 'draft-js';
import omitBlocksKeyFromContentState from '../../modifiers/__test__/helpers/omitBlocksKeyFromContentState';
import createEditorState from '../../__test__/helpers/createEditorState';

import processText from '../processText';

describe('processText', () => {
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
  const rawSelectionState = {
    anchorKey: 'item1',
    anchorOffset: 0,
    focusKey: 'item1',
    focusOffset: 0,
    isBackward: false,
    hasFocus: true
  };
  let afterRawContentState;
  it('insert text with new block', () => {
    const editorState = createEditorState(beforeRawContentState, rawSelectionState);
    const newEditorState = processText(editorState, 'text1', 'unstyled');
    afterRawContentState = {
      entityMap: {},
      blocks: [{
        key: 'item1',
        text: 'text1',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }]
    };
    expect(newEditorState).not.to.equal(editorState);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      expected
    ).to.deep.equal(
      afterRawContentState
    );
  });
  it('insert multiline text with new blocks', () => {
    const editorState = createEditorState(beforeRawContentState, rawSelectionState);
    const newEditorState = processText(editorState, 'text1\ntext2\ntext3', 'unstyled');
    afterRawContentState = {
      entityMap: {},
      blocks: [
        {
          key: 'item1',
          text: 'text1',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: 'item2',
          text: 'text2',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: 'item3',
          text: 'text3',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
      ]
    };
    expect(newEditorState).not.to.equal(editorState);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      omitBlocksKeyFromContentState(
        expected
      )
    ).to.deep.equal(
      omitBlocksKeyFromContentState(
        afterRawContentState
      )
    );
  });
});

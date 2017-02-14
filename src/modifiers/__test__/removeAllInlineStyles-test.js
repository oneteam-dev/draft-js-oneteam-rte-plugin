import { expect } from 'chai';
import Draft, { EditorState, SelectionState } from 'draft-js';

import removeAllInlineStyles from '../removeAllInlineStyles';

describe('removeAllInlineStyles', () => {
  const createEditorState = (rawContentState, selection) => {
    const contentState = Draft.convertFromRaw(rawContentState);
    return EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selection
    );
  };

  it('selection collapsed', () => {
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
          text: 'Contents',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            {
              length: 2,
              offset: 0,
              style: 'ITALIC'
            },
            {
              length: 2,
              offset: 2,
              style: 'BOLD'
            }
          ],
          entityRanges: [],
          data: {}
        }]
      },
      selection
    );
    const newEditorState = removeAllInlineStyles(editorState);
    expect(newEditorState).not.to.equal(editorState);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      expected
    ).to.deep.equal({
      entityMap: {},
      blocks: [{
        key: 'item1',
        text: 'Contents',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }]
    });
  });
  it('only selection ranges', () => {
    const selection = new SelectionState({
      anchorKey: 'item1',
      anchorOffset: 0,
      focusKey: 'item1',
      focusOffset: 3,
      isBackward: false,
      hasFocus: true
    });
    const editorState = createEditorState(
      {
        entityMap: {},
        blocks: [{
          key: 'item1',
          text: 'Contents',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            {
              length: 4,
              offset: 0,
              style: 'ITALIC'
            },
            {
              length: 4,
              offset: 2,
              style: 'BOLD'
            }
          ],
          entityRanges: [],
          data: {}
        }]
      },
      selection
    );
    const newEditorState = removeAllInlineStyles(editorState);
    expect(newEditorState).not.to.equal(editorState);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      expected
    ).to.deep.equal({
      entityMap: {},
      blocks: [{
        key: 'item1',
        text: 'Contents',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [
          {
            length: 1,
            offset: 3,
            style: 'ITALIC'
          },
          {
            length: 3,
            offset: 3,
            style: 'BOLD'
          }
        ],
        entityRanges: [],
        data: {}
      }]
    });
  });
});

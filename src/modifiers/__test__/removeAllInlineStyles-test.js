import { expect } from 'chai';
import Draft from 'draft-js';
import createEditorState from '../../__test__/helpers/createEditorState';
import removeAllInlineStyles from '../removeAllInlineStyles';

describe('removeAllInlineStyles', () => {
  it('selection collapsed', () => {
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
      {
        anchorKey: 'item1',
        anchorOffset: 0,
        focusKey: 'item1',
        focusOffset: 0,
        isBackward: false,
        hasFocus: true
      }
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
      {
        anchorKey: 'item1',
        anchorOffset: 0,
        focusKey: 'item1',
        focusOffset: 3,
        isBackward: false,
        hasFocus: true
      }
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

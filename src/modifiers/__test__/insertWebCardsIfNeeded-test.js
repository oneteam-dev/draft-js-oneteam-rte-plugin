import { expect } from 'chai';
import Draft, { EditorState, SelectionState } from 'draft-js';
import omitBlocksKeyFromContentState from './helpers/omitBlocksKeyFromContentState';

import insertWebCardsIfNeeded from '../insertWebCardsIfNeeded';

describe('insertWebCardsIfNeeded', () => {
  const createEditorState = (rawContentState, selection) => {
    const contentState = Draft.convertFromRaw(rawContentState);
    return EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selection
    );
  };
  it('noop', () => {
    const beforeRawContentState = {
      entityMap: {},
      blocks: [{
        key: 'item1',
        text: 'Text',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }]
    };

    const selection = new SelectionState({
      anchorKey: 'item1',
      anchorOffset: 4,
      focusKey: 'item1',
      focusOffset: 4,
      isBackward: false,
      hasFocus: true
    });
    const editorState = createEditorState(beforeRawContentState, selection);
    const newEditorState = insertWebCardsIfNeeded(editorState);
    expect(newEditorState).to.equal(editorState);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      // TODO: Block key is generatd random
      omitBlocksKeyFromContentState(expected)
    ).to.deep.equal(
      // TODO: Block key is generatd random
      omitBlocksKeyFromContentState(beforeRawContentState)
    );
  });
  it('insert', () => {
    const beforeRawContentState = {
      entityMap: {},
      blocks: [{
        key: 'item1',
        text: 'https://one-team.com',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }]
    };

    const afterRawContentState = {
      entityMap: {
        0: {
          data: {
            url: 'https://one-team.com',
          },
          mutability: 'IMMUTABLE',
          type: 'WEB_CARD'
        }
      },
      blocks: [
        {
          key: 'item1',
          text: 'https://one-team.com',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {
            webcardRendered: true
          }
        },
        {
          key: '0',
          text: ' ',
          type: 'atomic',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{
            key: 0,
            length: 1,
            offset: 0
          }],
          data: {}
        },
        {
          key: '1',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
      ]
    };
    const selection = new SelectionState({
      anchorKey: 'item1',
      anchorOffset: 20,
      focusKey: 'item1',
      focusOffset: 20,
      isBackward: false,
      hasFocus: true
    });
    const editorState = createEditorState(beforeRawContentState, selection);
    const newEditorState = insertWebCardsIfNeeded(editorState);
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

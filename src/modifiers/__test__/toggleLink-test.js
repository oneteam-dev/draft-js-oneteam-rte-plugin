import { expect } from 'chai';
import Draft, { EditorState, SelectionState } from 'draft-js';
import omitBlocksKeyFromContentState from './helpers/omitBlocksKeyFromContentState';

import toggleLink from '../toggleLink';

describe('toggleLink', () => {
  const beforeRawContentState = {
    entityMap: {
      0: {
        data: { url: 'https://one-team.com' },
        mutability: 'IMMUTABLE',
        type: 'LINK'
      }
    },
    blocks: [{
      key: 'item1',
      text: 'Text',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 4,
          key: 0
        }
      ],
      data: {}
    }]
  };

  const afterRawContentState = {
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
  const createEditorState = (rawContentState, selection) => {
    const contentState = Draft.convertFromRaw(rawContentState);
    return EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selection
    );
  };

  it('toggle', () => {
    const selection = new SelectionState({
      anchorKey: 'item1',
      anchorOffset: 0,
      focusKey: 'item1',
      focusOffset: 4,
      isBackward: false,
      hasFocus: true
    });
    const editorState = createEditorState(beforeRawContentState, selection);
    const newEditorState = toggleLink(editorState);
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
  it('noop', () => {
    const selection = new SelectionState({
      anchorKey: 'item1',
      anchorOffset: 0,
      focusKey: 'item1',
      focusOffset: 0,
      isBackward: false,
      hasFocus: true
    });
    const editorState = createEditorState(beforeRawContentState, selection);
    const newEditorState = toggleLink(editorState);
    expect(newEditorState).to.equal(editorState);
  });
});

import { expect } from 'chai';
import Draft, { EditorState, SelectionState } from 'draft-js';
import omitBlocksKeyFromContentState from './helpers/omitBlocksKeyFromContentState';

import insertIFrameAtomicBlock from '../insertIFrameAtomicBlock';

describe('insertIFrameAtomicBlock', () => {
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

  const afterRawContentState = {
    entityMap: {
      0: {
        data: {
          attributes: {
            src: 'https://one-team.com',
            frameborder: '0',
            allowfullscreen: ''
          }
        },
        mutability: 'IMMUTABLE',
        type: 'IFRAME'
      }
    },
    blocks: [
      {
        key: 'item1',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
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
      }
    ]
  };
  const selection = new SelectionState({
    anchorKey: 'item1',
    anchorOffset: 0,
    focusKey: 'item1',
    focusOffset: 0,
    isBackward: false,
    hasFocus: true
  });
  const contentState = Draft.convertFromRaw(beforeRawContentState);
  const editorState = EditorState.forceSelection(
    EditorState.createWithContent(contentState), selection);
  it('insert', () => {
    const newEditorState = insertIFrameAtomicBlock(
      editorState,
      '<iframe src="https://one-team.com" frameBorder="0" allowFullScreen></iframe>'
    );
    expect(newEditorState).not.to.equal(editorState);
    const d = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(
      // TODO: Block key is generatd random
      omitBlocksKeyFromContentState(d)
    ).to.deep.equal(
      // TODO: Block key is generatd random
      omitBlocksKeyFromContentState(afterRawContentState)
    );
  });
  it('noop', () => {
    const newEditorState = insertIFrameAtomicBlock(
      editorState,
      '<div></div>'
    );
    expect(newEditorState).to.equal(editorState);
  });
});

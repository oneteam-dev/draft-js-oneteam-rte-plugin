import { expect } from 'chai';
import Draft, { EditorState, SelectionState } from 'draft-js';

import mergeEntityData from '../mergeEntityData';

describe('mergeEntityData', () => {
  const selection = new SelectionState({
    anchorKey: 'item1',
    anchorOffset: 0,
    focusKey: 'item1',
    focusOffset: 0,
    isBackward: false,
    hasFocus: true
  });
  const createEditorState = (rawContentState) => {
    const contentState = Draft.convertFromRaw(rawContentState);
    return EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selection
    );
  };
  it('Merge block metadata', () => {
    const entityKey = Draft.Entity.create('EXAMPLE', 'MUTABLE', {
      foo: 1,
      bar: 2
    });
    const beforeRawContentState = {
      entityMap: {
        0: {
          data: {
            foo: 1,
            bar: 2
          },
          mutability: 'MUTABLE',
          type: 'EXAMPLE'
        }
      },
      blocks: [{
        key: 'item1',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            key: 0,
            length: 10,
            offset: 0
          }
        ],
        data: {}
      }]
    };
    const editorState = createEditorState(beforeRawContentState);
    mergeEntityData(editorState, entityKey, { foo: 3, baz: 4 });
    const actual = Draft.Entity.get(entityKey).getData();
    expect(actual).to.deep.equal({ foo: 3, bar: 2, baz: 4 });
  });
});

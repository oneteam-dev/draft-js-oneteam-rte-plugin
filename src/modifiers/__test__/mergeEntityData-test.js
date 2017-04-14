import { expect } from 'chai';
import createEditorState from '../../__test__/helpers/createEditorState';

import mergeEntityData from '../mergeEntityData';

describe('mergeEntityData', () => {
  it('Merge block metadata', () => {
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
    const rawSelectionState = {
      anchorKey: 'item1',
      anchorOffset: 0,
      focusKey: 'item1',
      focusOffset: 0,
      isBackward: false,
      hasFocus: true
    };
    const editorState = createEditorState(beforeRawContentState, rawSelectionState);
    const contentState = editorState.getCurrentContent().createEntity('EXAMPLE', 'MUTABLE', {
      foo: 1,
      bar: 2
    });
    const entityKey = contentState.getLastCreatedEntityKey();
    mergeEntityData(editorState, entityKey, { foo: 3, baz: 4 });
    const actual = contentState.getEntity(entityKey).getData();
    expect(actual).to.deep.equal({ foo: 3, bar: 2, baz: 4 });
  });
});

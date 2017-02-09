// @flow

import { EditorState, Entity } from 'draft-js';

const mergeEntityData = (editorState: EditorState, entityKey: string, data: Object): EditorState => {
  Entity.mergeData(entityKey, data);
  // `Entity.mergeData` does not mutate contentState in any way
  // https://github.com/facebook/draft-js/issues/399
  return EditorState.forceSelection(editorState, editorState.getSelection());
};

export default mergeEntityData;

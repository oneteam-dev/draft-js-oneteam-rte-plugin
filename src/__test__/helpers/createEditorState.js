import Draft, { EditorState, SelectionState } from 'draft-js';

const createEditorState = (rawContentState, rawSelectionState) => {
  const contentState = Draft.convertFromRaw(rawContentState);
  return EditorState.forceSelection(
    EditorState.createWithContent(contentState),
    new SelectionState(rawSelectionState)
  );
};

export default createEditorState;

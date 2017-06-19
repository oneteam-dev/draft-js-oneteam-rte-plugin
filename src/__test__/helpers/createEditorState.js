import Draft, { EditorState, SelectionState } from 'draft-js';

const createEditorState = (rawContentState, rawSelectionState) => {
  const contentState = rawContentState ? Draft.convertFromRaw(rawContentState) : null;
  const editorState = contentState ? EditorState.createWithContent(contentState) : EditorState.createEmpty();
  const selectionState = rawSelectionState ? new SelectionState(rawSelectionState) : SelectionState.createEmpty(
    editorState.getCurrentContent().getFirstBlock().getKey()
  );
  return EditorState.forceSelection(
    editorState,
    selectionState
  );
};

export default createEditorState;

import insertIndent from '../modifiers/insertIndent';

const handleTabToInsertIndent = (e, { getEditorState, setEditorState }): boolean => {
  const editorState = getEditorState();

  const newEditorState = insertIndent(editorState);
  if (editorState !== newEditorState) {
    e.preventDefault();
    setEditorState(newEditorState);
    return true;
  }
  return false;
};

export default handleTabToInsertIndent;

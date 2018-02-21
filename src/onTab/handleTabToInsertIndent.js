// @flow

import insertIndent from '../modifiers/insertIndent';

import type { PluginFunctions } from '../types/PluginFunctions';

const handleTabToInsertIndent = (e: SyntheticEvent<*>, { getEditorState, setEditorState }: PluginFunctions): boolean => {
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

// @flow

import type { EditorState } from 'draft-js';
import splitBlockInContentStateIfCursorAtStart from '../modifiers/splitBlockInContentStateIfCursorAtStart';

import type { Config } from '../types/Config';
import type { PluginFunctions } from '../types/PluginFunctions';

const handleReturnToSplitBlockIfCursorAtStart = (editorState: EditorState, config: Config, { setEditorState }: PluginFunctions): boolean => {
  const selection = editorState.getSelection();
  if (!selection.isCollapsed() || selection.getStartOffset() !== 0) {
    return false;
  }
  setEditorState(
    splitBlockInContentStateIfCursorAtStart(editorState)
  );
  return true;
};

export default handleReturnToSplitBlockIfCursorAtStart;

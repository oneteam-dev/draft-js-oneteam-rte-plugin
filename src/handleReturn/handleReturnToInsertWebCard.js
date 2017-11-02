// @flow

import type { EditorState } from 'draft-js';
import insertWebCardsIfNeeded from '../modifiers/insertWebCardsIfNeeded';

import type { Config } from '../types/Config';
import type { PluginFunctions } from '../types/PluginFunctions';

const handleReturnToInsertWebCard = (editorState: EditorState, config: Config, { setEditorState }: PluginFunctions): boolean => {
  if (config.disableWebCardCreation) return false;
  const newEditorState = insertWebCardsIfNeeded(editorState);
  if (editorState !== newEditorState) {
    setEditorState(newEditorState);
    return true;
  }
  return false;
};

export default handleReturnToInsertWebCard;

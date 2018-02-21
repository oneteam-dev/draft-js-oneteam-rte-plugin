// @flow

import { RichUtils } from 'draft-js';
import handleTabToInsertIndent from './handleTabToInsertIndent';

import type { Config } from '../types/Config';

const createOnTab = (config: Config): Function => (e, pluginFunctions): void => {
  if (handleTabToInsertIndent(e, pluginFunctions)) {
    return;
  }

  const editorState = pluginFunctions.getEditorState();
  const newEditorState = RichUtils.onTab(e, editorState, config.maxDepth);
  if (newEditorState !== editorState) {
    pluginFunctions.setEditorState(newEditorState);
  }
};

export default createOnTab;

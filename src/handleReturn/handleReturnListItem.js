// @flow

import { adjustBlockDepth, removeBlockStyle } from 'draft-js-modifiers';
import getCurrentBlock from 'draft-js-modifiers/utils/getCurrentBlock';
import type { EditorState } from 'draft-js';

import isListBlock from '../utils/isListBlock';

import type { Config } from '../types/Config';
import type { PluginFunctions } from '../types/PluginFunctions';

const handleReturnListItem = (editorState: EditorState, config: Config, { setEditorState }: PluginFunctions): boolean => {
  const selection = editorState.getSelection();
  const block = getCurrentBlock(editorState);

  if (isListBlock(block) && selection.isCollapsed()) {
    if (block.getLength() === 0) {
      if (block.getDepth() === 0) {
        const newEditorState = removeBlockStyle(editorState);
        if (editorState !== newEditorState) {
          setEditorState(newEditorState);
          return true;
        }
      } else {
        const newEditorState = adjustBlockDepth(
          editorState,
          -1,
          config.maxDepth
        );
        if (editorState !== newEditorState) {
          setEditorState(newEditorState);
          return true;
        }
      }
    }
  }
  return false;
};

export default handleReturnListItem;

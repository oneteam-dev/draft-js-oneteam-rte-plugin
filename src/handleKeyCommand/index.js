// @flow

import { RichUtils } from 'draft-js';

import type { EditorState } from 'draft-js';
import type { DraftHandleValue } from 'draft-js/lib/DraftHandleValue';

import removeBlockStyle from '../modifiers/removeBlockStyle';
import adjustBlockDepth from '../modifiers/adjustBlockDepth';
import getCurrentBlock from '../utils/getCurrentBlock';
import isListBlock from '../utils/isListBlock';

import type { Config } from '../types/Config';
import type { PluginFunctions } from '../types/PluginFunctions';

const createHandleKeyCommand = (config: Config): Function => (
  (command: string, editorState: EditorState, { setEditorState }: PluginFunctions): DraftHandleValue => {
    if (command === 'backspace') {
      const currentBlock = getCurrentBlock(editorState);
      const isEmpty = currentBlock.getLength() === 0;

      if (isListBlock(currentBlock) && isEmpty) {
        const newEditorState = currentBlock.getDepth() === 0 ?
          removeBlockStyle(editorState) :
          adjustBlockDepth(
            editorState,
            -1,
            config.maxDepth || 4
          );
        if (editorState !== newEditorState) {
          setEditorState(newEditorState);
          return 'handled';
        }
      }

      const firstBlockKey = editorState.getCurrentContent().getFirstBlock().getKey();
      if (isEmpty && currentBlock.getKey() === firstBlockKey) {
        const newEditorState = removeBlockStyle(editorState);
        if (editorState !== newEditorState) {
          setEditorState(newEditorState);
          return 'handled';
        }
      }
    }

    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  }
);

export default createHandleKeyCommand;

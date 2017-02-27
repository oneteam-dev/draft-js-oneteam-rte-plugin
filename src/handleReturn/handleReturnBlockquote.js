// @flow

import trimEnd from 'lodash/trimEnd';
import { EditorState, RichUtils } from 'draft-js';
import applyBlockData from '../modifiers/applyBlockData';
import insertEmptyBlock from '../modifiers/insertEmptyBlock';
import getCurrentBlock from '../utils/getCurrentBlock';
import { BLOCKQUOTE } from '../constants';

import type { Config } from '../types/Config';
import type { PluginFunctions } from '../types/PluginFunctions';

const handleReturnBlockquote = (
  event: SyntheticKeyboardEvent,
  editorState: EditorState,
  config: Config,
  { setEditorState }: PluginFunctions
): boolean => {
  const block = getCurrentBlock(editorState);
  if (block.getType() === BLOCKQUOTE) {
    const selection = editorState.getSelection();
    const collapsed = selection.isCollapsed();
    const length = block.getLength();
    const currentText = block.getText();
    const cursorAtEnd = length === selection.getStartOffset();
    const softNewlineAtEnd = currentText[length - 1] === '\n';
    const withMetaKey = event.ctrlKey || event.shiftKey || event.metaKey || event.altKey;

    let newEditorState;
    if (collapsed && cursorAtEnd && (softNewlineAtEnd || withMetaKey)) {
      const text = softNewlineAtEnd ? trimEnd(currentText, '\n') : currentText;
      const charList = block.getCharacterList();
      const characterList = softNewlineAtEnd ? charList.delete(charList.size - 1) : charList;
      newEditorState = insertEmptyBlock(
        applyBlockData(editorState, block.getKey(), { type: BLOCKQUOTE, text, characterList })
      );
    } else {
      newEditorState = RichUtils.insertSoftNewline(editorState);
    }

    setEditorState(newEditorState);
    return true;
  }
  return false;
};

export default handleReturnBlockquote;

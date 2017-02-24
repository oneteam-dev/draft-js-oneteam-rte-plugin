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
  if (RichUtils.getCurrentBlockType(editorState) === BLOCKQUOTE) {
    const selection = editorState.getSelection();
    const block = getCurrentBlock(editorState);
    const collapsed = selection.isCollapsed();
    const cursorAtEnd = block.getLength() === selection.getStartOffset();
    const softNewlineAtEnd = block.getText()[block.getLength() - 1] === '\n';
    const withMetaKey = event.ctrlKey || event.shiftKey || event.metaKey || event.altKey;

    let newEditorState;
    if (collapsed && cursorAtEnd && (softNewlineAtEnd || withMetaKey)) {
      const text = trimEnd(block.getText(), '\n');
      const chars = block.getCharacterList();
      const characterList = chars.delete(chars.size - 1);
      newEditorState = insertEmptyBlock(
        applyBlockData(
          editorState,
          block.getKey(),
          { type: BLOCKQUOTE, text, characterList }
        )
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

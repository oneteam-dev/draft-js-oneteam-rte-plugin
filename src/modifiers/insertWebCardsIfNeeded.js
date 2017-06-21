// @flow

import { EditorState, Modifier } from 'draft-js';
import getCurrentBlock from 'draft-js-modifiers/utils/getCurrentBlock';
import urlRegex from 'url-regex';
import insertWebCards from '../modifiers/insertWebCards';
import { CODE_BLOCK } from '../constants';

const insertWebCardsIfNeeded = (editorState: EditorState): EditorState => {
  const selection = editorState.getSelection();
  const block = getCurrentBlock(editorState);
  const webcardRendered = block.getData().get('webcardRendered');
  const urls = block.getText().match(urlRegex());
  const isCursorAtEnd = block.getLength() === selection.getStartOffset();

  if (!webcardRendered && urls && isCursorAtEnd && block.getType() !== CODE_BLOCK) {
    const content = editorState.getCurrentContent();
    const newContent = Modifier.setBlockData(content, selection, { webcardRendered: true });
    return insertWebCards(EditorState.push(editorState, newContent, 'change-block-data'), urls);
  }
  return editorState;
};

export default insertWebCardsIfNeeded;

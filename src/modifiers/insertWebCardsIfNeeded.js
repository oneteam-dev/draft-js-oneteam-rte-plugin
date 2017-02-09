// @flow

import { EditorState, Modifier } from 'draft-js';
import urlRegex from 'url-regex';
import insertWebCards from '../modifiers/insertWebCards';
import getCurrentBlock from '../utils/getCurrentBlock';

const insertWebCardsIfNeeded = (editorState: EditorState): EditorState => {
  const selection = editorState.getSelection();
  const block = getCurrentBlock(editorState);
  const webcardRendered = block.getData().get('webcardRendered');
  const urls = block.getText().match(urlRegex());
  const isCursorAtEnd = block.getLength() === selection.getStartOffset();

  if (!webcardRendered && urls && isCursorAtEnd) {
    const content = editorState.getCurrentContent();
    const newContent = Modifier.setBlockData(content, selection, { webcardRendered: true });
    return insertWebCards(EditorState.push(editorState, newContent, 'change-block-data'), urls);
  }
  return editorState;
};

export default insertWebCardsIfNeeded;

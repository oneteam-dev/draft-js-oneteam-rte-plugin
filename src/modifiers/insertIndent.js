// @flow

import { EditorState } from 'draft-js';
import { insertText } from 'draft-js-modifiers';
import getCurrentBlock from 'draft-js-modifiers/utils/getCurrentBlock';
import isListBlock from '../utils/isListBlock';

const insertIndent = (editorState: EditorState): EditorState => {
  const block = getCurrentBlock(editorState);

  if (isListBlock(block)) {
    return editorState;
  }

  return insertText(editorState, '    ');
};

export default insertIndent;

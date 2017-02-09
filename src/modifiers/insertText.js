// @flow

import { EditorState, Modifier } from 'draft-js';

const insertText = (editorState: EditorState, text: string): EditorState => {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const newContent = Modifier.insertText(
    content,
    selection,
    text,
    editorState.getCurrentInlineStyle()
  );

  return EditorState.push(
    editorState,
    newContent,
    'insert-fragment'
  );
};

export default insertText;

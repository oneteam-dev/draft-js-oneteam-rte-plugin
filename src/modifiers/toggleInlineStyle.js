// @flow

import { EditorState, RichUtils } from 'draft-js';

const toggleInlineStyle = (editorState: EditorState, inlineStyle: string): EditorState => (
  RichUtils.toggleInlineStyle(editorState, inlineStyle)
);

export default toggleInlineStyle;

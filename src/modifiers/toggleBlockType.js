// @flow

import { EditorState, RichUtils } from 'draft-js';

const toggleBlockType = (editorState: EditorState, blockType: string): EditorState => (
  RichUtils.toggleBlockType(editorState, blockType)
);

export default toggleBlockType;

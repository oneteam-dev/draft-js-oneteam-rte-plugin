// @flow

import { EditorState, RichUtils } from 'draft-js';
import { CODE_BLOCK } from '../constants';

const toggleInlineStyle = (editorState: EditorState, inlineStyle: string): EditorState => (
  RichUtils.getCurrentBlockType(editorState) !== CODE_BLOCK ?
    RichUtils.toggleInlineStyle(editorState, inlineStyle) :
    editorState
);

export default toggleInlineStyle;

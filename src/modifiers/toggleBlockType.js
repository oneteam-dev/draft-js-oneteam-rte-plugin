// @flow

import { EditorState, RichUtils } from 'draft-js';
import toggleCodeBlock from './toggleCodeBlock';
import { CODE_BLOCK } from '../constants';

const toggleBlockType = (editorState: EditorState, blockType: string): EditorState => (
  blockType === CODE_BLOCK ?
    toggleCodeBlock(editorState) :
    RichUtils.toggleBlockType(editorState, blockType)
);

export default toggleBlockType;

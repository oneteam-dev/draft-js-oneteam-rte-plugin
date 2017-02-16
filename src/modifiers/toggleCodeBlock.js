// @flow

import { EditorState, RichUtils } from 'draft-js';
import removeAllInlineStyles from './removeAllInlineStyles';
import { CODE_BLOCK, OLD_INLINE_STYLES } from '../constants';

const toggleCodeBlock = (editorState: EditorState): EditorState => (
  RichUtils.toggleBlockType(
    removeAllInlineStyles(editorState, OLD_INLINE_STYLES), CODE_BLOCK
  )
);

export default toggleCodeBlock;

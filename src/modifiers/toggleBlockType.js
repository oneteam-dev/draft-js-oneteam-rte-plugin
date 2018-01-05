// @flow

import { EditorState, RichUtils } from 'draft-js';

import type { DraftBlockType } from 'draft-js/lib/DraftBlockType';

import toggleCodeBlock from './toggleCodeBlock';
import { CODE_BLOCK } from '../constants';

const toggleBlockType = (editorState: EditorState, blockType: DraftBlockType): EditorState => (
  blockType === CODE_BLOCK ?
    toggleCodeBlock(editorState) :
    RichUtils.toggleBlockType(editorState, blockType)
);

export default toggleBlockType;

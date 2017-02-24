// @flow

import { EditorState, DraftBlockType } from 'draft-js';
import insertNewBlock from './insertNewBlock';

const insertEmptyBlock = (editorState: EditorState, blockType: DraftBlockType = 'unstyled'): EditorState => (
  insertNewBlock(editorState, blockType)
);

export default insertEmptyBlock;

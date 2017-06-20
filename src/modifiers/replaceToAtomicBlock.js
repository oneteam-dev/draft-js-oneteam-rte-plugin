// @flow

import { EditorState, ContentBlock } from 'draft-js';
import removeBlock from './removeBlock';
import insertAtomicBlock from './insertAtomicBlock';

const replaceToAtomicBlock = (
  editorState: EditorState,
  block: ContentBlock,
  entityType: string,
  mutability: string,
  data: Object,
  character: string
): EditorState => (
  insertAtomicBlock(
    removeBlock(editorState, block),
    entityType,
    mutability,
    data,
    character
  )
);

export default replaceToAtomicBlock;

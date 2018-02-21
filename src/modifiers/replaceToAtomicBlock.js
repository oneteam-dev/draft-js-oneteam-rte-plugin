// @flow

import { EditorState, ContentBlock } from 'draft-js';
import { insertAtomicBlock } from 'draft-js-modifiers';
import removeBlock from './removeBlock';

const replaceToAtomicBlock = (
  editorState: EditorState,
  block: ContentBlock,
  entityType: string,
  mutability: string,
  data?: Object,
  character?: string
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

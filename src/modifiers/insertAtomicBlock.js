// @flow

import { EditorState, Entity } from 'draft-js';
import AtomicBlockUtils from 'draft-js/lib/AtomicBlockUtils';

/**
 * @param {EditorState} editorState
 * @param {string} entityType
 * @param {string} mutability `IMMUTABLE`, `MUTABLE` or `SEGMENTED`
 * @param {Object} data
 * @param {string} character [character = ' ']
 * @returns {EditorState}
 */
const insertAtomicBlock = (
  editorState: EditorState,
  entityType: string,
  mutability: string,
  data: Object,
  character: ?string = ' '
): EditorState => {
  const entityKey = Entity.create(entityType, mutability, data);
  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    character
  );
};

export default insertAtomicBlock;

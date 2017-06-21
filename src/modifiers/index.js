export {
  adjustBlockDepth,
  insertAtomicBlock,
  insertText,
  mergeBlockDataByKey as mergeBlockData,
  mergeEntityData,
  removeBlockStyle,
  toggleEntity
} from 'draft-js-modifiers';

export { default as insertIFrameAtomicBlock } from './insertIFrameAtomicBlock';
export { default as insertImageAtomicBlock } from './insertImageAtomicBlock';
export { default as insertIndent } from './insertIndent';
export { default as insertWebCards } from './insertWebCards';
export { default as insertWebCardsIfNeeded } from './insertWebCardsIfNeeded';
export { default as removeBlock } from './removeBlock';
export { default as replaceToAtomicBlock } from './replaceToAtomicBlock';
export { default as splitBlockInContentStateIfCursorAtStart } from './splitBlockInContentStateIfCursorAtStart';
export { default as toggleBlockType } from './toggleBlockType';
export { default as toggleInlineStyle } from './toggleInlineStyle';
export { default as toggleLink } from './toggleLink';

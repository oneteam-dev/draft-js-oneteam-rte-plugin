// @flow

import { EditorState } from 'draft-js';
import { insertAtomicBlock } from 'draft-js-modifiers';
import { IMAGE } from '../constants';

const insertImageAtomicBlock = (editorState: EditorState, { url, alt, title }: Object): EditorState => (
  insertAtomicBlock(editorState, IMAGE, 'IMMUTABLE', {
    src: url,
    alt,
    title,
  })
);

export default insertImageAtomicBlock;

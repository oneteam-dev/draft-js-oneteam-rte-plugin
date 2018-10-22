// @flow

import type { EditorState } from 'draft-js';
import { insertAtomicBlock } from 'draft-js-modifiers';
import { randomBytes } from 'crypto';
import { FILE_PLACEHOLDER } from '../constants';

type FileType = {
  name: string,
  size: number,
  type: string,
};

type FilePlaceholderType = {
  file: FileType,
  isImage: ?boolean,
};

const entiryData = ({ file, isImage }: FilePlaceholderType) => ({
  name: file.name,
  size: file.size,
  contentType: file.type,
  id: randomBytes(16).toString('hex'),
  file,
  ...(isImage ? { isImage: true } : {})
});

const insertFilePlaceholders = (editorState: EditorState, filePlaceholders: Array<FilePlaceholderType>): EditorState => (
  filePlaceholders.reduce(
    (state, filePlaceholder) => insertAtomicBlock(state, FILE_PLACEHOLDER, 'IMMUTABLE', entiryData(filePlaceholder)),
    editorState
  )
);

export default insertFilePlaceholders;

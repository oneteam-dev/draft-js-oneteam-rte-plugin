// @flow

import { EditorState } from 'draft-js';
import insertAtomicBlock from './insertAtomicBlock';
import * as domHelper from '../helpers/dom';
import { IFRAME } from '../constants';

const insertIFrameAtomicBlock = (editorState: EditorState, html: string): EditorState => {
  const iframe = domHelper.extractIFrameNode(html);
  if (!iframe) {
    return editorState;
  }

  const attributes = domHelper.attributesToObject(iframe);
  return insertAtomicBlock(
    editorState,
    IFRAME,
    'IMMUTABLE',
    { ...attributes }
  );
};

export default insertIFrameAtomicBlock;

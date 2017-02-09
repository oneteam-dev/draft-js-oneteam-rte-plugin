// @flow

import { EditorState, Entity } from 'draft-js';
import toggleEntity from './toggleEntity';
import { LINK } from '../constants';

const toggleLink = (editorState: EditorState, url?: ?string = null): EditorState => {
  const selection = editorState.getSelection();

  if (selection.isCollapsed()) {
    return editorState;
  }

  const entityKey = url ? Entity.create(LINK, 'MUTABLE', { url }) : null;
  return toggleEntity(editorState, entityKey);
};

export default toggleLink;

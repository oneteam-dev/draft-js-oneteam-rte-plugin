// @flow

import { EditorState, RichUtils } from 'draft-js';

const toggleEntity = (editorState: EditorState, entityKey: ?string): EditorState => (
  RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey)
);

export default toggleEntity;

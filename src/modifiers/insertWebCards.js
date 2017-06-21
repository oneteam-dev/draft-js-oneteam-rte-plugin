// @flow

import { insertAtomicBlock } from 'draft-js-modifiers';

import type { EditorState } from 'draft-js';

import { WEB_CARD } from '../constants';

const insertWebCards = (editorState: EditorState, urls: Array<string>): EditorState => (
  urls.reduce(
    (state, url) => insertAtomicBlock(state, WEB_CARD, 'IMMUTABLE', { url }),
    editorState
  )
);

export default insertWebCards;

// @flow

import { RichUtils } from 'draft-js';
import urlRegex from 'url-regex';

import type DraftHandleValue from 'draft-js/lib/DraftHandleValue';

import insertText from '../modifiers/insertText';
import insertWebCards from '../modifiers/insertWebCards';
import { CODE_BLOCK } from '../constants';

import type { PluginFunctions } from '../types/PluginFunctions';

const createHandlePastedText = (/* config: Object */): Function => (
  (text: ?string, html: ?string, { getEditorState, setEditorState }: PluginFunctions): DraftHandleValue => {
    if (!text) {
      return 'not-handled';
    }

    const editorState = getEditorState();
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    const urls = text.match(urlRegex());

    if (currentBlockType === CODE_BLOCK) {
      setEditorState(
        insertText(editorState, text),
      );
      return 'handled';
    } else if (urls && currentBlockType !== CODE_BLOCK) {
      setEditorState(
        insertWebCards(
          insertText(editorState, text),
          urls
        )
      );
      return 'handled';
    }
    return 'not-handled';
  }
);

export default createHandlePastedText;

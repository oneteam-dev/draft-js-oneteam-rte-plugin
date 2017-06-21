// @flow

import { RichUtils } from 'draft-js';
import { insertText } from 'draft-js-modifiers';
import urlRegex from 'url-regex';

import type { EditorState } from 'draft-js';
import type { DraftHandleValue } from 'draft-js/lib/DraftHandleValue';

import processText from './processText';
import insertWebCards from '../modifiers/insertWebCards';
import { CODE_BLOCK } from '../constants';

import type { PluginFunctions } from '../types/PluginFunctions';

const createHandlePastedText = (/* config: Object */): Function => (
  (text: ?string, html: ?string, editorState: EditorState, { setEditorState }: PluginFunctions): DraftHandleValue => {
    if (!text) {
      return 'not-handled';
    }

    const currentBlockType = RichUtils.getCurrentBlockType(editorState);
    const urls = text.match(urlRegex());

    if (currentBlockType === CODE_BLOCK) {
      setEditorState(
        insertText(editorState, text)
      );
      return 'handled';
    } else if (urls && currentBlockType !== CODE_BLOCK) {
      setEditorState(
        insertWebCards(
          processText(editorState, text),
          urls
        )
      );
      return 'handled';
    }
    return 'not-handled';
  }
);

export default createHandlePastedText;

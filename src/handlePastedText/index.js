// @flow

import urlRegex from 'url-regex';

import type DraftHandleValue from 'draft-js/lib/DraftHandleValue';

import insertText from '../modifiers/insertText';
import insertWebCards from '../modifiers/insertWebCards';

import type { PluginFunctions } from '../types/PluginFunctions';

const createHandlePastedText = (/* config: Object */): Function => (
  (text: ?string, html: ?string, { getEditorState, setEditorState }: PluginFunctions): DraftHandleValue => {
    if (!text) {
      return 'not-handled';
    }

    const urls = text.match(urlRegex());
    if (urls) {
      const editorState = getEditorState();
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

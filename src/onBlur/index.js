// @flow

import insertWebCardsIfNeeded from '../modifiers/insertWebCardsIfNeeded';

import type { Config } from '../types/Config';
import type { PluginFunctions } from '../types/PluginFunctions';

const createOnBlur = (config: Config): Function => (
  (event: SyntheticFocusEvent, { getEditorState, setEditorState }: PluginFunctions): void => {
    if (config.disableWebCardCreation) return;
    setTimeout(() => { // Not changed state if do not do this
      const editorState = getEditorState();
      const newContentState = insertWebCardsIfNeeded(editorState);
      if (newContentState !== editorState) {
        setEditorState(newContentState);
      }
    }, 0);
  }
);

export default createOnBlur;

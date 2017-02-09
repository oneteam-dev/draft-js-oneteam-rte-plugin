// @flow

import * as modifiers from '../modifiers';

const createBoundModifiers = (store: Object): Object => (
  Object.keys(modifiers).reduce((ret, key) => ({
    ...ret,
    [key](...args) {
      const editorState = store.getEditorState();
      const newEditorState = modifiers[key](editorState, ...args);
      if (newEditorState !== editorState) {
        store.setEditorState(newEditorState);
      }
    },
  }), {})
);

export default createBoundModifiers;

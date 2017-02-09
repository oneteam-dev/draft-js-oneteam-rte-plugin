'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var mergeEntityData = function mergeEntityData(editorState, entityKey, data) {
  _draftJs.Entity.mergeData(entityKey, data);
  // `Entity.mergeData` does not mutate contentState in any way
  // https://github.com/facebook/draft-js/issues/399
  return _draftJs.EditorState.forceSelection(editorState, editorState.getSelection());
};

exports.default = mergeEntityData;
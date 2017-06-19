'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var mergeEntityData = function mergeEntityData(editorState, entityKey, data) {
  var newContentState = editorState.getCurrentContent().mergeEntityData(entityKey, data);
  return _draftJs.EditorState.push(editorState, newContentState, 'apply-entity');
};

exports.default = mergeEntityData;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var toggleEntity = function toggleEntity(editorState, entityKey) {
  return _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
};

exports.default = toggleEntity;
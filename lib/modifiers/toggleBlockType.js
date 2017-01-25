'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var toggleBlockType = function toggleBlockType(editorState, blockType) {
  return _draftJs.RichUtils.toggleBlockType(editorState, blockType);
};

exports.default = toggleBlockType;
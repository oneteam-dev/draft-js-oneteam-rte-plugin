'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _constants = require('../constants');

var toggleInlineStyle = function toggleInlineStyle(editorState, inlineStyle) {
  return _draftJs.RichUtils.getCurrentBlockType(editorState) !== _constants.CODE_BLOCK ? _draftJs.RichUtils.toggleInlineStyle(editorState, inlineStyle) : editorState;
};

exports.default = toggleInlineStyle;
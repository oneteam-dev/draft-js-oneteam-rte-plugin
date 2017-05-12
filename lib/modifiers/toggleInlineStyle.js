'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var toggleInlineStyle = function toggleInlineStyle(editorState, inlineStyle) {
  return _draftJs.RichUtils.toggleInlineStyle(editorState, inlineStyle);
};

exports.default = toggleInlineStyle;
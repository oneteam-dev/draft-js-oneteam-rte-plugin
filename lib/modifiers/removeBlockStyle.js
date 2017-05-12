'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var removeBlockStyle = function removeBlockStyle(editorState) {
  var withoutBlockStyle = _draftJs.RichUtils.tryToRemoveBlockStyle(editorState);
  if (withoutBlockStyle) {
    return _draftJs.EditorState.push(editorState, withoutBlockStyle, 'change-block-type');
  }
  return editorState;
};

exports.default = removeBlockStyle;
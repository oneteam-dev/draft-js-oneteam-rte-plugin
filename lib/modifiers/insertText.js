'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var insertText = function insertText(editorState, text) {
  var entity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var newContent = _draftJs.Modifier[selection.isCollapsed() ? 'insertText' : 'replaceText'](content, selection, text, editorState.getCurrentInlineStyle(), entity);

  return _draftJs.EditorState.push(editorState, newContent, 'insert-fragment');
};

exports.default = insertText;
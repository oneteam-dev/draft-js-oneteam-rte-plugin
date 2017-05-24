'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var getCurrentBlock = function getCurrentBlock(editorState) {
  var selection = editorState.getSelection();
  return editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
};

exports.default = getCurrentBlock;
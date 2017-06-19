'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mergeBlockData = function mergeBlockData(editorState, blockKey, data) {
  var content = editorState.getCurrentContent();
  var updatedBlock = content.getBlockForKey(blockKey).mergeIn(['data'], data);
  var blockMap = content.getBlockMap().merge(_defineProperty({}, blockKey, updatedBlock));
  return _draftJs.EditorState.push(editorState, content.merge({ blockMap: blockMap }), 'change-block-data');
};

exports.default = mergeBlockData;
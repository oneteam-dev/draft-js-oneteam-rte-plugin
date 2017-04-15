'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var applyBlockData = function applyBlockData(editorState, blockKey, blockData) {
  var content = editorState.getCurrentContent();
  var blockMap = content.getBlockMap();
  var newBlockMap = blockMap.map(function (b) {
    return b.key === blockKey ? b.merge(blockData) : b;
  });
  var newContent = content.merge({ blockMap: newBlockMap });

  return _draftJs.EditorState.push(editorState, newContent, 'split-block' // TODO: will this do ?
  );
};

exports.default = applyBlockData;
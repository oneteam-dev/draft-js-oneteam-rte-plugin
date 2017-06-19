'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _getCurrentBlock = require('../utils/getCurrentBlock');

var _getCurrentBlock2 = _interopRequireDefault(_getCurrentBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertNewBlock = function insertNewBlock(editorState) {
  var blockType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'unstyled';
  var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var characterList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (0, _immutable.List)();
  var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var content = editorState.getCurrentContent();
  var selection = editorState.getSelection();
  var currentBlock = (0, _getCurrentBlock2.default)(editorState);
  var emptyBlockKey = (0, _draftJs.genKey)();
  var emptyBlock = new _draftJs.ContentBlock({
    key: emptyBlockKey,
    type: blockType,
    text: text,
    characterList: characterList,
    data: (0, _immutable.Map)().merge(data)
  });
  var blockMap = content.getBlockMap();
  var blocksBefore = blockMap.toSeq().takeUntil(function (value) {
    return value === currentBlock;
  });
  var blocksAfter = blockMap.toSeq().skipUntil(function (value) {
    return value === currentBlock;
  }).rest();
  var augmentedBlocks = [[currentBlock.getKey(), currentBlock], [emptyBlockKey, emptyBlock]];
  var newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap();
  var focusKey = emptyBlockKey;
  var newContent = content.merge({
    blockMap: newBlocks,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: focusKey,
      anchorOffset: 0,
      focusKey: focusKey,
      focusOffset: 0,
      isBackward: false
    })
  });

  var newState = _draftJs.EditorState.push(editorState, newContent, 'split-block');
  return _draftJs.EditorState.forceSelection(newState, newContent.getSelectionAfter());
};

exports.default = insertNewBlock;
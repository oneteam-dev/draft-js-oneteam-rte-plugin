'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _removeBlockStyle = require('../modifiers/removeBlockStyle');

var _removeBlockStyle2 = _interopRequireDefault(_removeBlockStyle);

var _adjustBlockDepth = require('../modifiers/adjustBlockDepth');

var _adjustBlockDepth2 = _interopRequireDefault(_adjustBlockDepth);

var _isListBlock = require('../utils/isListBlock');

var _isListBlock2 = _interopRequireDefault(_isListBlock);

var _getCurrentBlock = require('../utils/getCurrentBlock');

var _getCurrentBlock2 = _interopRequireDefault(_getCurrentBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleReturnListItem = function handleReturnListItem(editorState, config, _ref) {
  var setEditorState = _ref.setEditorState;

  var selection = editorState.getSelection();
  var block = (0, _getCurrentBlock2.default)(editorState);

  if ((0, _isListBlock2.default)(block) && selection.isCollapsed()) {
    if (block.getLength() === 0) {
      if (block.getDepth() === 0) {
        var newEditorState = (0, _removeBlockStyle2.default)(editorState);
        if (editorState !== newEditorState) {
          setEditorState(newEditorState);
          return true;
        }
      } else {
        var _newEditorState = (0, _adjustBlockDepth2.default)(editorState, -1, config.maxDepth);
        if (editorState !== _newEditorState) {
          setEditorState(_newEditorState);
          return true;
        }
      }
    }
  }
  return false;
};

exports.default = handleReturnListItem;
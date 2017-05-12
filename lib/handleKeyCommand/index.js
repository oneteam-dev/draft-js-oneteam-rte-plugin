'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _removeBlockStyle = require('../modifiers/removeBlockStyle');

var _removeBlockStyle2 = _interopRequireDefault(_removeBlockStyle);

var _adjustBlockDepth = require('../modifiers/adjustBlockDepth');

var _adjustBlockDepth2 = _interopRequireDefault(_adjustBlockDepth);

var _getCurrentBlock = require('../utils/getCurrentBlock');

var _getCurrentBlock2 = _interopRequireDefault(_getCurrentBlock);

var _isListBlock = require('../utils/isListBlock');

var _isListBlock2 = _interopRequireDefault(_isListBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHandleKeyCommand = function createHandleKeyCommand(config) {
  return function (command, _ref) {
    var getEditorState = _ref.getEditorState,
        setEditorState = _ref.setEditorState;

    var editorState = getEditorState();

    if (command === 'backspace') {
      var currentBlock = (0, _getCurrentBlock2.default)(editorState);
      var isEmpty = currentBlock.getLength() === 0;

      if ((0, _isListBlock2.default)(currentBlock) && isEmpty) {
        var _newEditorState = currentBlock.getDepth() === 0 ? (0, _removeBlockStyle2.default)(editorState) : (0, _adjustBlockDepth2.default)(editorState, -1, config.maxDepth || 4);
        if (editorState !== _newEditorState) {
          setEditorState(_newEditorState);
          return 'handled';
        }
      }

      var firstBlockKey = editorState.getCurrentContent().getFirstBlock().getKey();
      if (isEmpty && currentBlock.getKey() === firstBlockKey) {
        var _newEditorState2 = (0, _removeBlockStyle2.default)(editorState);
        if (editorState !== _newEditorState2) {
          setEditorState(_newEditorState2);
          return 'handled';
        }
      }
    }

    var newEditorState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      setEditorState(newEditorState);
      return 'handled';
    }

    return 'not-handled';
  };
};

exports.default = createHandleKeyCommand;
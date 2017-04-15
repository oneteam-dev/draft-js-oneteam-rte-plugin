'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trimEnd = require('lodash/trimEnd');

var _trimEnd2 = _interopRequireDefault(_trimEnd);

var _draftJs = require('draft-js');

var _applyBlockData = require('../modifiers/applyBlockData');

var _applyBlockData2 = _interopRequireDefault(_applyBlockData);

var _insertEmptyBlock = require('../modifiers/insertEmptyBlock');

var _insertEmptyBlock2 = _interopRequireDefault(_insertEmptyBlock);

var _getCurrentBlock = require('../utils/getCurrentBlock');

var _getCurrentBlock2 = _interopRequireDefault(_getCurrentBlock);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleReturnBlockquote = function handleReturnBlockquote(event, editorState, config, _ref) {
  var setEditorState = _ref.setEditorState;

  var block = (0, _getCurrentBlock2.default)(editorState);
  if (block.getType() === _constants.BLOCKQUOTE) {
    var selection = editorState.getSelection();
    var collapsed = selection.isCollapsed();
    var length = block.getLength();
    var currentText = block.getText();
    var cursorAtEnd = length === selection.getStartOffset();
    var softNewlineAtEnd = currentText[length - 1] === '\n';
    var withMetaKey = event.ctrlKey || event.shiftKey || event.metaKey || event.altKey;

    var newEditorState = void 0;
    if (collapsed && cursorAtEnd && (softNewlineAtEnd || withMetaKey)) {
      var text = softNewlineAtEnd ? (0, _trimEnd2.default)(currentText, '\n') : currentText;
      var charList = block.getCharacterList();
      var characterList = softNewlineAtEnd ? charList.delete(charList.size - 1) : charList;
      newEditorState = (0, _insertEmptyBlock2.default)((0, _applyBlockData2.default)(editorState, block.getKey(), { type: _constants.BLOCKQUOTE, text: text, characterList: characterList }));
    } else {
      newEditorState = _draftJs.RichUtils.insertSoftNewline(editorState);
    }

    setEditorState(newEditorState);
    return true;
  }
  return false;
};

exports.default = handleReturnBlockquote;
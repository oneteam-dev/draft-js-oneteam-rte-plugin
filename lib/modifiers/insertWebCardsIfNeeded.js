'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _urlRegex = require('url-regex');

var _urlRegex2 = _interopRequireDefault(_urlRegex);

var _insertWebCards = require('../modifiers/insertWebCards');

var _insertWebCards2 = _interopRequireDefault(_insertWebCards);

var _getCurrentBlock = require('../utils/getCurrentBlock');

var _getCurrentBlock2 = _interopRequireDefault(_getCurrentBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertWebCardsIfNeeded = function insertWebCardsIfNeeded(editorState) {
  var selection = editorState.getSelection();
  var block = (0, _getCurrentBlock2.default)(editorState);
  var webcardRendered = block.getData().get('webcardRendered');
  var urls = block.getText().match((0, _urlRegex2.default)());
  var isCursorAtEnd = block.getLength() === selection.getStartOffset();

  if (!webcardRendered && urls && isCursorAtEnd) {
    var content = editorState.getCurrentContent();
    var newContent = _draftJs.Modifier.setBlockData(content, selection, { webcardRendered: true });
    return (0, _insertWebCards2.default)(_draftJs.EditorState.push(editorState, newContent, 'change-block-data'), urls);
  }
  return editorState;
};

exports.default = insertWebCardsIfNeeded;
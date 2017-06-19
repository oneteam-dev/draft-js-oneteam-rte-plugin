'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _insertText = require('./insertText');

var _insertText2 = _interopRequireDefault(_insertText);

var _getCurrentBlock = require('../utils/getCurrentBlock');

var _getCurrentBlock2 = _interopRequireDefault(_getCurrentBlock);

var _isListBlock = require('../utils/isListBlock');

var _isListBlock2 = _interopRequireDefault(_isListBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertIndent = function insertIndent(editorState) {
  var block = (0, _getCurrentBlock2.default)(editorState);

  if ((0, _isListBlock2.default)(block)) {
    return editorState;
  }

  return (0, _insertText2.default)(editorState, '    ');
};

exports.default = insertIndent;
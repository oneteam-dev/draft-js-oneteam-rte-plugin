'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _toggleCodeBlock = require('./toggleCodeBlock');

var _toggleCodeBlock2 = _interopRequireDefault(_toggleCodeBlock);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleBlockType = function toggleBlockType(editorState, blockType) {
  return blockType === _constants.CODE_BLOCK ? (0, _toggleCodeBlock2.default)(editorState) : _draftJs.RichUtils.toggleBlockType(editorState, blockType);
};

exports.default = toggleBlockType;
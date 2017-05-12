'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _removeBlock = require('./removeBlock');

var _removeBlock2 = _interopRequireDefault(_removeBlock);

var _insertAtomicBlock = require('./insertAtomicBlock');

var _insertAtomicBlock2 = _interopRequireDefault(_insertAtomicBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var replaceToAtomicBlock = function replaceToAtomicBlock(editorState, block, entityType, mutability, data, character) {
  return (0, _insertAtomicBlock2.default)((0, _removeBlock2.default)(editorState, block), entityType, mutability, data, character);
};

exports.default = replaceToAtomicBlock;
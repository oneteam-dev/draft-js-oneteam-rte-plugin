'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _insertAtomicBlock = require('./insertAtomicBlock');

var _insertAtomicBlock2 = _interopRequireDefault(_insertAtomicBlock);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertImageAtomicBlock = function insertImageAtomicBlock(editorState, _ref) {
  var url = _ref.url,
      alt = _ref.alt,
      title = _ref.title;
  return (0, _insertAtomicBlock2.default)(editorState, _constants.IMAGE, 'IMMUTABLE', {
    src: url,
    alt: alt,
    title: title
  });
};

exports.default = insertImageAtomicBlock;
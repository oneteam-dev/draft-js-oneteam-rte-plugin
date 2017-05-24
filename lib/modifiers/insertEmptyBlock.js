'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _insertNewBlock = require('./insertNewBlock');

var _insertNewBlock2 = _interopRequireDefault(_insertNewBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertEmptyBlock = function insertEmptyBlock(editorState) {
  var blockType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'unstyled';
  return (0, _insertNewBlock2.default)(editorState, blockType);
};

exports.default = insertEmptyBlock;
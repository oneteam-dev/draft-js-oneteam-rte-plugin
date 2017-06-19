'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _removeAllInlineStyles = require('./removeAllInlineStyles');

var _removeAllInlineStyles2 = _interopRequireDefault(_removeAllInlineStyles);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleCodeBlock = function toggleCodeBlock(editorState) {
  return _draftJs.RichUtils.toggleBlockType((0, _removeAllInlineStyles2.default)(editorState, _constants.OLD_INLINE_STYLES), _constants.CODE_BLOCK);
};

exports.default = toggleCodeBlock;
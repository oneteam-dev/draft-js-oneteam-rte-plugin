'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../../../constants');

// The reason this returns an array is because a single block might get wrapped
// in two tags.

var getTag = function getTag(blockType) {
  switch (blockType) {
    case _constants.BLOCK_TYPES.H1:
      return 'h1';
    case _constants.BLOCK_TYPES.H2:
      return 'h2';
    case _constants.BLOCK_TYPES.H3:
      return 'h3';
    case _constants.BLOCK_TYPES.H4:
      return 'h4';
    case _constants.BLOCK_TYPES.H5:
      return 'h5';
    case 'header-six':
      return 'h6';
    case _constants.BLOCK_TYPES.UNORDERED_LIST_ITEM:
    case _constants.BLOCK_TYPES.ORDERED_LIST_ITEM:
    case _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM:
      return 'li';
    case _constants.BLOCK_TYPES.BLOCKQUOTE:
      return 'blockquote';
    case _constants.BLOCK_TYPES.CODE_BLOCK:
      return 'pre';
    case _constants.BLOCK_TYPES.ATOMIC:
      return 'figure';
    default:
      return 'div';
  }
};

exports.default = getTag;
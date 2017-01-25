'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../../../constants');

var canHaveDepth = function canHaveDepth(blockType) {
  switch (blockType) {
    case _constants.BLOCK_TYPES.UNORDERED_LIST_ITEM:
    case _constants.BLOCK_TYPES.ORDERED_LIST_ITEM:
    case _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM:
      return true;
    default:
      return false;
  }
};

exports.default = canHaveDepth;
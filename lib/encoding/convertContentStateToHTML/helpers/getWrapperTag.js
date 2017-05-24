'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../../../constants');

var getWrapperTag = function getWrapperTag(blockType) {
  switch (blockType) {
    case _constants.BLOCK_TYPES.UNORDERED_LIST_ITEM:
    case _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM:
      return 'ul';
    case _constants.BLOCK_TYPES.ORDERED_LIST_ITEM:
      return 'ol';
    default:
      return null;
  }
};

exports.default = getWrapperTag;
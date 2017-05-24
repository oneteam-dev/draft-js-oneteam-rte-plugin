'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var isListBlock = function isListBlock(block) {
  var type = block.getType();
  return _constants.LIST_BLOCK_TYPES.some(function (t) {
    return t === type;
  });
};

exports.default = isListBlock;
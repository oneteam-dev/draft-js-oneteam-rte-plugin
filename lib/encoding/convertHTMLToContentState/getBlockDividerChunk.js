'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('../../constants');

var _constants2 = require('./constants');

var hasCheckboxInput = function hasCheckboxInput(element) {
  if (!element || !element.children) {
    return false;
  }
  return element.children[0].tagName === 'INPUT' && element.children[0].type === 'checkbox';
};

var getBlockDividerChunk = function getBlockDividerChunk(block, depth, element) {
  // eslint-disable-line
  var chunk = {
    text: _constants2.CR,
    inlines: [(0, _immutable.OrderedSet)()],
    entities: new Array(1),
    blocks: [{
      type: block,
      depth: Math.max(0, Math.min(_constants2.MAX_LIST_DEPTH, depth))
    }]
  };
  if (block === _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM && hasCheckboxInput(element)) {
    chunk.blocks[0].data = (0, _immutable.Map)({ checked: !!element.children[0].checked });
  }
  if (block === _constants.BLOCK_TYPES.CODE_BLOCK) {
    var language = element.getAttribute('data-language');
    if (language) {
      chunk.blocks[0].data = (0, _immutable.Map)({ language: language });
    }
  }
  return chunk;
};

exports.default = getBlockDividerChunk;
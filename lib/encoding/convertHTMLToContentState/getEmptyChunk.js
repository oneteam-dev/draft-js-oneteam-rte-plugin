'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var getEmptyChunk = function getEmptyChunk() {
  return {
    text: '',
    inlines: [],
    entities: [],
    blocks: []
  };
};

exports.default = getEmptyChunk;
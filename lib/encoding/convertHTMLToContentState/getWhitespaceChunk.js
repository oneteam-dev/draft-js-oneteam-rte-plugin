'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

var getWhitespaceChunk = function getWhitespaceChunk(inEntity) {
  var entities = new Array(1);
  if (inEntity) {
    entities[0] = inEntity;
  }
  return {
    text: _constants.SPACE,
    inlines: [(0, _immutable.OrderedSet)()],
    entities: entities,
    blocks: []
  };
};

exports.default = getWhitespaceChunk;
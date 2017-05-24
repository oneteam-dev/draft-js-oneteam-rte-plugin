'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _constants = require('./constants');

var getSoftNewlineChunk = function getSoftNewlineChunk() {
  return {
    text: _constants.LF,
    inlines: [(0, _immutable.OrderedSet)()],
    entities: new Array(1),
    blocks: []
  };
};

exports.default = getSoftNewlineChunk;
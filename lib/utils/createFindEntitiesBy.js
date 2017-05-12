'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var createFindEntitiesBy = function createFindEntitiesBy(entityType) {
  return function (block, callback) {
    block.findEntityRanges(function (character) {
      var entityKey = character.getEntity();
      return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === entityType;
    }, callback);
  };
};

exports.default = createFindEntitiesBy;
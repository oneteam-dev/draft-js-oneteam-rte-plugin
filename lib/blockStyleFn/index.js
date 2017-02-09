'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

// import type { PluginFunctions } from '../types/PluginFunctions';

var createBlockStyleFn = function createBlockStyleFn(config) {
  return function (block) {
    var type = block.getType();

    if (config.blockStyleMap && config.blockStyleMap[type]) {
      return config.blockStyleMap[type];
    }

    switch (type) {
      case _constants.ALIGN_CENTER:
      case _constants.ALIGN_RIGHT:
      case _constants.ALIGN_JUSTIFY:
        return type;
      default: // noop
    }
  };
};

exports.default = createBlockStyleFn;
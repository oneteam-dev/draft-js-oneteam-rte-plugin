'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// import type { PluginFunctions } from '../types/PluginFunctions';

var createHandlePastedFiles = function createHandlePastedFiles(config) {
  return function (files) {
    var onPastedFiles = config.onPastedFiles;

    if (typeof onPastedFiles === 'function') {
      onPastedFiles(files);
      return 'handled';
    }
    return 'not-handled';
  };
};

exports.default = createHandlePastedFiles;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var handleReturnWithCommand = function handleReturnWithCommand(event, config) {
  var onReturnWithCommand = config.onReturnWithCommand;

  if (typeof onReturnWithCommand === 'function' && _draftJs.KeyBindingUtil.hasCommandModifier(event)) {
    onReturnWithCommand(event);
    return true;
  }
  return false;
};

exports.default = handleReturnWithCommand;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var normalizeHTML = function normalizeHTML(html) {
  return html.trim().replace(_constants.REGEX_CR, '').replace(_constants.REGEX_NBSP, _constants.SPACE).replace(_constants.REGEX_CARRIAGE, '').replace(_constants.REGEX_ZWS, '');
};

exports.default = normalizeHTML;
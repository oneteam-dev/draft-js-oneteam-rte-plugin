'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

/**
 * Check to see if we have anything like <p> <blockquote> <h1>... to create
 * block tags from. If we do, we can use those and ignore <div> tags. If we
 * don't, we can treat <div> tags as meaningful (unstyled) blocks.
 */
var containsSemanticBlockMarkup = function containsSemanticBlockMarkup(html) {
  return _constants.BASE_BLOCK_TAG_NAMES.some(function (tag) {
    return html.indexOf('<' + tag) !== -1;
  });
};

exports.default = containsSemanticBlockMarkup;
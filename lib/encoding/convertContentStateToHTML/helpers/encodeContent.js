'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BREAK = exports.BREAK = '<br/>';

var encodeContent = function encodeContent(text) {
  return (
    /* eslint-disable newline-per-chained-call */
    text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('\xA0').join('&nbsp;').split('\n').join(BREAK)
    /* eslint-enable newline-per-chained-call */

  );
};

exports.default = encodeContent;
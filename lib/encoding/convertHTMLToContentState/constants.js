'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MAX_LIST_DEPTH = exports.MAX_LIST_DEPTH = 4;
var NBSP = exports.NBSP = '&nbsp;';
var SPACE = exports.SPACE = ' ';
var CR = exports.CR = '\r';
var LF = exports.LF = '\n';

// used for replacing characters in HTML
var REGEX_CR = exports.REGEX_CR = new RegExp(CR, 'g');
var REGEX_LF = exports.REGEX_LF = new RegExp(LF, 'g');
var REGEX_NBSP = exports.REGEX_NBSP = new RegExp(NBSP, 'g');
var REGEX_CARRIAGE = exports.REGEX_CARRIAGE = new RegExp('&#13;?', 'g');
var REGEX_ZWS = exports.REGEX_ZWS = new RegExp('&#8203;?', 'g');

// Block tag flow is different because LIs do not have
// a deterministic style ;_;
var BASE_BLOCK_TAG_NAMES = exports.BASE_BLOCK_TAG_NAMES = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre', 'div'];
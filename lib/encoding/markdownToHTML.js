'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _htmlclean = require('htmlclean');

var _htmlclean2 = _interopRequireDefault(_htmlclean);

var _he = require('he');

var _he2 = _interopRequireDefault(_he);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderer = new _marked2.default.Renderer();

renderer.listitem = function (text) {
  /* eslint-disable no-useless-escape */
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text // eslint-disable-line no-param-reassign
    .replace(/^\s*\[ \]\s*/, '<input type="checkbox" /> ').replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked /> ');
    return '<li class="task-list-item">' + text + '</li>\n';
  }
  /* eslint-enable no-useless-escape */
  return '<li>' + text + '</li>\n';
};

renderer.code = function (code, language) {
  var escapedCode = _he2.default.escape(code);
  return '<pre' + (language ? ' data-language="' + language + '"' : '') + '>' + escapedCode + '</pre>';
};

renderer.paragraph = function (text) {
  return '<div>' + text + '</div>\n';
};

renderer.blockquote = function (text) {
  return '<blockquote>' + text.replace(/\n$/, '').split('\n').join('<br />') + '</blockquote>';
};

_marked2.default.setOptions({
  gfm: true,
  smartLists: true,
  renderer: renderer
});

var markdownToHTML = function markdownToHTML(markdown) {
  return (0, _htmlclean2.default)((0, _marked2.default)(markdown));
};

exports.default = markdownToHTML;
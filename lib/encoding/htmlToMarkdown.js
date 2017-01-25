'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toMarkdown = require('to-markdown');

var _toMarkdown2 = _interopRequireDefault(_toMarkdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toMarkdownOptions = {
  converters: [{
    filter: ['div', 'figure', 'p'],
    replacement: function replacement(content) {
      return '\n\n' + content + '\n\n';
    }
  }, {
    filter: 'br',
    replacement: function replacement(content, node) {
      // Blank line
      var parentNode = node.parentNode;

      if ((parentNode.nodeName === 'DIV' || parentNode.nodeName === 'P') && !!parentNode.nextElementSibling && parentNode.children.length === 1) {
        return '<br />';
      }
      return '';
    }
  }, {
    filter: 'pre',
    replacement: function replacement(content, node) {
      var language = node.getAttribute('data-language');
      return '```' + (language || '') + '\n' + content + '\n```\n\n';
    }
  },
  // checkbox list
  {
    filter: function filter(node) {
      var firstSiblingNode = node.parentNode.firstChild;
      return firstSiblingNode.nodeName === 'INPUT' && firstSiblingNode.type === 'checkbox' && node.nodeName === 'SPAN';
    },
    replacement: function replacement(content) {
      return content;
    }
  },
  // Trim extra space and change to 2 space indent for list
  // issue: https://github.com/domchristie/to-markdown/issues/161
  // will monkey patching because not customizable
  // ref: https://github.com/domchristie/to-markdown/blob/1fde68fd7cde63676bda85f8580b6be52a0b0a20/lib/md-converters.js#L105
  {
    filter: 'li',
    replacement: function replacement(content, node) {
      var parent = node.parentNode;
      var index = Array.prototype.indexOf.call(parent.children, node) + 1;
      var prefix = /ol/i.test(parent.nodeName) ? index + '. ' : '- ';
      return prefix + content.replace(/^\s+/, '').replace(/\n/gm, '\n  ');
    }
  }],
  gfm: true
};

var htmlToMarkdown = function htmlToMarkdown(html) {
  return (0, _toMarkdown2.default)(html, toMarkdownOptions);
};

exports.default = htmlToMarkdown;
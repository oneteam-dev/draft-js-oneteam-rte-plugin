'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toMarkdown = require('to-markdown');

var _toMarkdown2 = _interopRequireDefault(_toMarkdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInNode = function isInNode(nodeName, node) {
  var maxDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

  if (maxDepth <= 0) {
    return false;
  }
  if (node.parentNode.nodeName === nodeName) {
    return true;
  }
  return isInNode(nodeName, node.parentNode, maxDepth - 1);
};

var toMarkdownOptions = {
  converters: [{
    filter: ['div', 'figure', 'p'],
    replacement: function replacement(content, node) {
      // strip line-break if in <blockquote />
      if (node.parentNode.nodeName === 'BLOCKQUOTE') {
        return content;
      }
      return '\n\n' + content + '\n\n';
    }
  }, {
    filter: 'br',
    replacement: function replacement(content, node) {
      var parentNode = node.parentNode;

      if (isInNode('BLOCKQUOTE', node) ||
      // Blank line
      (parentNode.nodeName === 'DIV' || parentNode.nodeName === 'P') && !!parentNode.nextElementSibling && parentNode.children.length === 1) {
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
  // header in blockquote
  {
    filter: function filter(node) {
      return (/^H(1|2|3|4|5|6)$/.test(node.nodeName) && isInNode('BLOCKQUOTE', node)
      );
    },
    replacement: function replacement(content, node) {
      var level = node.nodeName.charAt(1);
      var prefix = '';
      for (var i = 0; i < level; i++) {
        prefix += '#';
      }
      return prefix + ' ' + content;
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
  }, {
    filter: 'blockquote',
    replacement: function replacement(content) {
      var ret = content.split(/<br\s*\/?>/).map(function (str) {
        return '\n> ' + str;
      }).join('');
      return ret;
    }
  }],
  gfm: true
};

var htmlToMarkdown = function htmlToMarkdown(html) {
  return (0, _toMarkdown2.default)(html, toMarkdownOptions);
};

exports.default = htmlToMarkdown;
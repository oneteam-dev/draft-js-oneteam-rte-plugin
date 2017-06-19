'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../../constants');

var inlineTags = {
  b: _constants.INLINE_STYLES.BOLD,
  code: _constants.INLINE_STYLES.CODE,
  del: _constants.INLINE_STYLES.STRIKETHROUGH,
  em: _constants.INLINE_STYLES.ITALIC,
  i: _constants.INLINE_STYLES.ITALIC,
  s: _constants.INLINE_STYLES.STRIKETHROUGH,
  strike: _constants.INLINE_STYLES.STRIKETHROUGH,
  strong: _constants.INLINE_STYLES.BOLD,
  u: 'UNDERLINE',
  ins: 'UNDERLINE'
};

var hasFontSize = function hasFontSize(element) {
  return Object.keys(_constants.OLD_INLINE_STYLES_SIZE).some(function (label) {
    return _constants.OLD_INLINE_STYLES_SIZE[label].fontSize === parseInt(element.style.fontSize, 10);
  });
};

var hasColor = function hasColor(element, prop) {
  return _constants.OLD_COLORS.some(function (color) {
    return color === element.style[prop];
  });
};

var processInlineTag = function processInlineTag(tag, node, currentStyle) {
  var styleToCheck = inlineTags[tag];
  if (styleToCheck) {
    currentStyle = currentStyle.add(styleToCheck).toOrderedSet(); // eslint-disable-line no-param-reassign
  } else if (node instanceof HTMLElement) {
    var htmlElement = node;
    currentStyle = currentStyle.withMutations(function (style) {
      // eslint-disable-line no-param-reassign
      if (htmlElement.style.fontWeight === 'bold') {
        style.add(_constants.INLINE_STYLES.BOLD);
      }

      if (htmlElement.style.fontStyle === 'italic') {
        style.add(_constants.INLINE_STYLES.ITALIC);
      }

      if (htmlElement.style.textDecoration === 'underline') {
        style.add('UNDERLINE');
      }

      if (htmlElement.style.textDecoration === 'line-through') {
        style.add(_constants.INLINE_STYLES.STRIKETHROUGH);
      }

      if (hasColor(htmlElement, 'color')) {
        var styleLabel = Object.keys(_constants.OLD_INLINE_STYLES).filter(function (label) {
          return _constants.OLD_INLINE_STYLES[label].color === htmlElement.style.color;
        })[0];
        style.add(styleLabel);
      }

      if (hasColor(htmlElement, 'backgroundColor')) {
        var _styleLabel = Object.keys(_constants.OLD_INLINE_STYLES).filter(function (label) {
          return _constants.OLD_INLINE_STYLES[label].backgroundColor === htmlElement.style.backgroundColor;
        })[0];
        style.add(_styleLabel);
      }

      if (hasFontSize(htmlElement)) {
        var _styleLabel2 = Object.keys(_constants.OLD_INLINE_STYLES_SIZE).filter(function (label) {
          return _constants.OLD_INLINE_STYLES_SIZE[label].fontSize === parseInt(htmlElement.style.fontSize, 10);
        })[0];
        style.add(_styleLabel2);
      }
    }).toOrderedSet();
  }
  return currentStyle;
};

exports.default = processInlineTag;
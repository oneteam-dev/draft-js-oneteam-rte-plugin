'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../../constants');

var getBlockTypeForTag = function getBlockTypeForTag(tagName, lastList, element) {
  switch (tagName) {
    case 'h1':
      return _constants.BLOCK_TYPES.H1;
    case 'h2':
      return _constants.BLOCK_TYPES.H2;
    case 'h3':
      return _constants.BLOCK_TYPES.H3;
    case 'h4':
      return _constants.BLOCK_TYPES.H4;
    case 'h5':
      return _constants.BLOCK_TYPES.H5;
    case 'h6':
      return 'header-six';
    case 'li':
      if (lastList === 'ol') {
        return _constants.BLOCK_TYPES.ORDERED_LIST_ITEM;
      }
      if (element && element.classList.contains('task-list-item')) {
        return _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM;
      }
      return _constants.BLOCK_TYPES.UNORDERED_LIST_ITEM;
    case 'blockquote':
      return _constants.BLOCK_TYPES.BLOCKQUOTE;
    case 'pre':
      return _constants.BLOCK_TYPES.CODE_BLOCK;
    case 'div':
      if (element && element.style.textAlign === 'center') {
        return _constants.OLD_BLOCK_TYPES.ALIGN_CENTER;
      } else if (element && element.style.textAlign === 'right') {
        return _constants.OLD_BLOCK_TYPES.ALIGN_RIGHT;
      } else if (element && element.style.textAlign === 'justify') {
        return _constants.OLD_BLOCK_TYPES.ALIGN_JUSTIFY;
      }
      return _constants.BLOCK_TYPES.UNSTYLED;
    default:
      return _constants.BLOCK_TYPES.UNSTYLED;
  }
};

exports.default = getBlockTypeForTag;
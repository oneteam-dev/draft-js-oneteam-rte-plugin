'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OLD_BLOCK_TYPES = exports.OLD_INLINE_STYLES = exports.OLD_INLINE_STYLES_SIZE = exports.OLD_COLORS = exports.MAX_LIST_DEPTH = exports.ORDERED_INLINE_STYLES = exports.INLINE_STYLES = exports.ORDERED_BLOCK_TYPES = exports.LIST_BLOCK_TYPES = exports.HEADER_BLOCK_TYPES = exports.BLOCK_TYPES = exports.ENTITY_TYPES = exports.FILE_PLACEHOLDER = exports.PLACEHOLDER = exports.IFRAME = exports.DOWNLOAD_LINK = exports.LINK = exports.IMAGE = exports.WEB_CARD = exports.CODE = exports.STRIKETHROUGH = exports.ITALIC = exports.BOLD = exports.ALIGN_JUSTIFY = exports.ALIGN_RIGHT = exports.ALIGN_CENTER = exports.CODE_BLOCK = exports.ATOMIC = exports.UNORDERED_LIST_ITEM = exports.ORDERED_LIST_ITEM = exports.BLOCKQUOTE = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.UNSTYLED = undefined;

var _draftJsCheckableListItem = require('draft-js-checkable-list-item');

// Block types
var UNSTYLED = exports.UNSTYLED = 'unstyled';
var H1 = exports.H1 = 'header-one';
var H2 = exports.H2 = 'header-two';
var H3 = exports.H3 = 'header-three';
var H4 = exports.H4 = 'header-four';
var H5 = exports.H5 = 'header-five';
var BLOCKQUOTE = exports.BLOCKQUOTE = 'blockquote';
var ORDERED_LIST_ITEM = exports.ORDERED_LIST_ITEM = 'ordered-list-item';
var UNORDERED_LIST_ITEM = exports.UNORDERED_LIST_ITEM = 'unordered-list-item';
var ATOMIC = exports.ATOMIC = 'atomic';
var CODE_BLOCK = exports.CODE_BLOCK = 'code-block';

// Other block types
var ALIGN_CENTER = exports.ALIGN_CENTER = 'align-center';
var ALIGN_RIGHT = exports.ALIGN_RIGHT = 'align-right';
var ALIGN_JUSTIFY = exports.ALIGN_JUSTIFY = 'align-justify';

// Inline styles
var BOLD = exports.BOLD = 'BOLD';
var ITALIC = exports.ITALIC = 'ITALIC';
var STRIKETHROUGH = exports.STRIKETHROUGH = 'STRIKETHROUGH';
var CODE = exports.CODE = 'CODE';

// Entity types
// export const WEB_CARD = 'web-card';
// export const IMAGE = 'image';
// export const DOWNLOAD_LINK = 'download-link';
// export const IFRAME = 'iframe';
// export const PLACEHOLDER = 'placholder'; // unused
// export const FILE_PLACEHOLDER = 'file-placeholder';

// TODO: change to future
var WEB_CARD = exports.WEB_CARD = 'WEB_CARD';
var IMAGE = exports.IMAGE = 'IMAGE';
var LINK = exports.LINK = 'LINK';
var DOWNLOAD_LINK = exports.DOWNLOAD_LINK = 'DOWNLOAD_LINK';
var IFRAME = exports.IFRAME = 'IFRAME';
var PLACEHOLDER = exports.PLACEHOLDER = 'PLACEHOLDER'; // unused
var FILE_PLACEHOLDER = exports.FILE_PLACEHOLDER = 'FILE_PLACEHOLDER';

var ENTITY_TYPES = exports.ENTITY_TYPES = {
  WEB_CARD: WEB_CARD, IMAGE: IMAGE, LINK: LINK, DOWNLOAD_LINK: DOWNLOAD_LINK, IFRAME: IFRAME, PLACEHOLDER: PLACEHOLDER, FILE_PLACEHOLDER: FILE_PLACEHOLDER
};

var BLOCK_TYPES = exports.BLOCK_TYPES = {
  UNSTYLED: UNSTYLED,
  H1: H1,
  H2: H2,
  H3: H3,
  H4: H4,
  H5: H5,
  BLOCKQUOTE: BLOCKQUOTE,
  ORDERED_LIST_ITEM: ORDERED_LIST_ITEM,
  UNORDERED_LIST_ITEM: UNORDERED_LIST_ITEM,
  ATOMIC: ATOMIC,
  CODE_BLOCK: CODE_BLOCK,
  CHECKABLE_LIST_ITEM: _draftJsCheckableListItem.CHECKABLE_LIST_ITEM
};

var HEADER_BLOCK_TYPES = exports.HEADER_BLOCK_TYPES = [H1, H2, H3, H4, H5];

var LIST_BLOCK_TYPES = exports.LIST_BLOCK_TYPES = [UNORDERED_LIST_ITEM, ORDERED_LIST_ITEM, _draftJsCheckableListItem.CHECKABLE_LIST_ITEM];

var ORDERED_BLOCK_TYPES = exports.ORDERED_BLOCK_TYPES = [H1, H2, H3, H4, H5, BLOCKQUOTE, _draftJsCheckableListItem.CHECKABLE_LIST_ITEM, UNORDERED_LIST_ITEM, ORDERED_LIST_ITEM, CODE_BLOCK];

var INLINE_STYLES = exports.INLINE_STYLES = {
  BOLD: BOLD,
  ITALIC: ITALIC,
  STRIKETHROUGH: STRIKETHROUGH,
  CODE: CODE
};

var ORDERED_INLINE_STYLES = exports.ORDERED_INLINE_STYLES = [BOLD, ITALIC, STRIKETHROUGH, CODE];

var MAX_LIST_DEPTH = exports.MAX_LIST_DEPTH = 4;

// It was used in previous editor
var OLD_COLORS = exports.OLD_COLORS = ['rgb(0, 0, 0)', 'rgb(230, 0, 0)', 'rgb(255, 153, 0)', 'rgb(255, 255, 0)', 'rgb(0, 138, 0)', 'rgb(0, 102, 204)', 'rgb(153, 51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)', 'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)', 'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)', 'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)', 'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)', 'rgb(136, 136, 136)', 'rgb(161, 0, 0)', 'rgb(178, 107, 0)', 'rgb(178, 178, 0)', 'rgb(0, 97, 0)', 'rgb(0, 71, 178)', 'rgb(107, 36, 178)', 'rgb(68, 68, 68)', 'rgb(92, 0, 0)', 'rgb(102, 61, 0)', 'rgb(102, 102, 0)', 'rgb(0, 55, 0)', 'rgb(0, 41, 102)', 'rgb(61, 20, 10)'];

var OLD_INLINE_STYLES_SIZE = exports.OLD_INLINE_STYLES_SIZE = {
  SIZE_NORMAL: { fontSize: 13 },
  SIZE_SMALLER: { fontSize: 10 },
  SIZE_LARGER: { fontSize: 24 },
  SIZE_HUGE: { fontSize: 32 }
};

var OLD_INLINE_STYLES = exports.OLD_INLINE_STYLES = OLD_COLORS.reduce(function (result, color, i) {
  result['COLOR' + i] = { color: color }; // eslint-disable-line no-param-reassign
  result['BACKGROUND_COLOR' + i] = { backgroundColor: color }; // eslint-disable-line no-param-reassign
  return result;
}, OLD_INLINE_STYLES_SIZE);

var OLD_BLOCK_TYPES = exports.OLD_BLOCK_TYPES = {
  ALIGN_CENTER: ALIGN_CENTER,
  ALIGN_RIGHT: ALIGN_RIGHT,
  ALIGN_JUSTIFY: ALIGN_JUSTIFY
};
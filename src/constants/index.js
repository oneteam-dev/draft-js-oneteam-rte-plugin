import { CHECKABLE_LIST_ITEM } from 'draft-js-checkable-list-item';

// Block types
export const UNSTYLED = 'unstyled';
export const H1 = 'header-one';
export const H2 = 'header-two';
export const H3 = 'header-three';
export const H4 = 'header-four';
export const H5 = 'header-five';
export const BLOCKQUOTE = 'blockquote';
export const ORDERED_LIST_ITEM = 'ordered-list-item';
export const UNORDERED_LIST_ITEM = 'unordered-list-item';
export const ATOMIC = 'atomic';
export const CODE_BLOCK = 'code-block';

// Other block types
export const ALIGN_CENTER = 'align-center';
export const ALIGN_RIGHT = 'align-right';
export const ALIGN_JUSTIFY = 'align-justify';

// Inline styles
export const BOLD = 'BOLD';
export const ITALIC = 'ITALIC';
export const STRIKETHROUGH = 'STRIKETHROUGH';
export const CODE = 'CODE';

// Entity types
// export const WEB_CARD = 'web-card';
// export const IMAGE = 'image';
// export const DOWNLOAD_LINK = 'download-link';
// export const IFRAME = 'iframe';
// export const PLACEHOLDER = 'placholder'; // unused
// export const FILE_PLACEHOLDER = 'file-placeholder';

// TODO: change to future
export const WEB_CARD = 'WEB_CARD';
export const IMAGE = 'IMAGE';
export const LINK = 'LINK';
export const DOWNLOAD_LINK = 'DOWNLOAD_LINK';
export const IFRAME = 'IFRAME';
export const PLACEHOLDER = 'PLACEHOLDER'; // unused
export const FILE_PLACEHOLDER = 'FILE_PLACEHOLDER';

export const ENTITY_TYPES = {
  WEB_CARD, IMAGE, LINK, DOWNLOAD_LINK, IFRAME, PLACEHOLDER, FILE_PLACEHOLDER
};

export const BLOCK_TYPES = {
  UNSTYLED,
  H1,
  H2,
  H3,
  H4,
  H5,
  BLOCKQUOTE,
  ORDERED_LIST_ITEM,
  UNORDERED_LIST_ITEM,
  ATOMIC,
  CODE_BLOCK,
  CHECKABLE_LIST_ITEM
};

export const HEADER_BLOCK_TYPES = [
  H1,
  H2,
  H3,
  H4,
  H5
];

export const LIST_BLOCK_TYPES = [
  UNORDERED_LIST_ITEM,
  ORDERED_LIST_ITEM,
  CHECKABLE_LIST_ITEM
];

export const ORDERED_BLOCK_TYPES = [
  H1,
  H2,
  H3,
  H4,
  H5,
  BLOCKQUOTE,
  CHECKABLE_LIST_ITEM,
  UNORDERED_LIST_ITEM,
  ORDERED_LIST_ITEM,
  CODE_BLOCK
];

export const INLINE_STYLES = {
  BOLD,
  ITALIC,
  STRIKETHROUGH,
  CODE
};

export const ORDERED_INLINE_STYLES = [
  BOLD,
  ITALIC,
  STRIKETHROUGH,
  CODE
];

export const MAX_LIST_DEPTH = 4;

// It was used in previous editor
// TODO: naming
export const OLD_COLORS = [
  'rgb(0, 0, 0)', 'rgb(230, 0, 0)', 'rgb(255, 153, 0)', 'rgb(255, 255, 0)',
  'rgb(0, 138, 0)', 'rgb(0, 102, 204)', 'rgb(153, 51, 255)', 'rgb(255, 255, 255)',
  'rgb(250, 204, 204)', 'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
  'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)', 'rgb(240, 102, 102)',
  'rgb(255, 194, 102)', 'rgb(255, 255, 102)', 'rgb(102, 185, 102)', 'rgb(102, 163, 224)',
  'rgb(194, 133, 255)', 'rgb(136, 136, 136)', 'rgb(161, 0, 0)', 'rgb(178, 107, 0)',
  'rgb(178, 178, 0)', 'rgb(0, 97, 0)', 'rgb(0, 71, 178)', 'rgb(107, 36, 178)',
  'rgb(68, 68, 68)', 'rgb(92, 0, 0)', 'rgb(102, 61, 0)', 'rgb(102, 102, 0)',
  'rgb(0, 55, 0)', 'rgb(0, 41, 102)', 'rgb(61, 20, 10)'
];

export const OLD_INLINE_STYLES_SIZE = {
  SIZE_NORMAL: { fontSize: 13 },
  SIZE_SMALLER: { fontSize: 10 },
  SIZE_LARGER: { fontSize: 24 },
  SIZE_HUGE: { fontSize: 32 }
};

export const OLD_INLINE_STYLES = OLD_COLORS.reduce((result, color, i) => {
  result[`COLOR${i}`] = { color }; // eslint-disable-line no-param-reassign
  result[`BACKGROUND_COLOR${i}`] = { backgroundColor: color }; // eslint-disable-line no-param-reassign
  return result;
}, OLD_INLINE_STYLES_SIZE);

export const OLD_BLOCK_TYPES = {
  ALIGN_CENTER,
  ALIGN_RIGHT,
  ALIGN_JUSTIFY
};

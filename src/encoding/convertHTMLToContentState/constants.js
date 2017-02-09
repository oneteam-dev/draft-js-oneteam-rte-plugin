export const MAX_LIST_DEPTH = 4;
export const NBSP = '&nbsp;';
export const SPACE = ' ';
export const CR = '\r';
export const LF = '\n';

// used for replacing characters in HTML
export const REGEX_CR = new RegExp(CR, 'g');
export const REGEX_LF = new RegExp(LF, 'g');
export const REGEX_NBSP = new RegExp(NBSP, 'g');
export const REGEX_CARRIAGE = new RegExp('&#13;?', 'g');
export const REGEX_ZWS = new RegExp('&#8203;?', 'g');

// Block tag flow is different because LIs do not have
// a deterministic style ;_;
export const BASE_BLOCK_TAG_NAMES = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre', 'div'];

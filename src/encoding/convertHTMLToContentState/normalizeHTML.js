import { SPACE, REGEX_CR, REGEX_NBSP, REGEX_CARRIAGE, REGEX_ZWS } from './constants';

const normalizeHTML = (html: string): string => (
  html
    .trim()
    .replace(REGEX_CR, '')
    .replace(REGEX_NBSP, SPACE)
    .replace(REGEX_CARRIAGE, '')
    .replace(REGEX_ZWS, '')
);

export default normalizeHTML;

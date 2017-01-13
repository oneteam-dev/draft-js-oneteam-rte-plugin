import { BASE_BLOCK_TAG_NAMES } from '../constants';

/**
 * Check to see if we have anything like <p> <blockquote> <h1>... to create
 * block tags from. If we do, we can use those and ignore <div> tags. If we
 * don't, we can treat <div> tags as meaningful (unstyled) blocks.
 */
const containsSemanticBlockMarkup = (html: string): boolean => (
  BASE_BLOCK_TAG_NAMES.some((tag) => html.indexOf(`<${tag}`) !== -1)
);

export default containsSemanticBlockMarkup;

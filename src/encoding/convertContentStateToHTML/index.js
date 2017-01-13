import htmlclean from 'htmlclean';

import type { ContentState } from 'draft-js';

import MarkupGenerator from './MarkupGenerator';

import type { Options } from './types';

const convertContentStateToHTML = (content: ContentState, options: Options): string => {
  const html = new MarkupGenerator(content, options).generate();
  return htmlclean(html);
};

export default convertContentStateToHTML;

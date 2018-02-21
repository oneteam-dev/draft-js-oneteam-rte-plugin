// @flow

import htmlclean from 'htmlclean';
import merge from 'lodash/merge';
import he from 'he';

import type { ContentState } from 'draft-js';

import MarkupGenerator from './MarkupGenerator';
import { BLOCK_TYPES } from '../../constants';

import type { Options } from './types';

const defaultOptions = {
  blockRenderers: {
    [BLOCK_TYPES.CODE_BLOCK](block) {
      const lang = block.getData().get('language');
      const text = block.getText();
      const escapedText = he.escape(text);
      return `<pre${lang ? ` data-language="${lang}"` : ''}>${escapedText}</pre>`;
    }
  }
};

const convertContentStateToHTML = (content: ContentState, options: Options): string => {
  const html = new MarkupGenerator(content, merge({}, defaultOptions, options)).generate();
  return htmlclean(html);
};

export default convertContentStateToHTML;

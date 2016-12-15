// @flow

import camelCase from 'lodash/camelCase';

export const extractIFrameNode = (html: string): ?Element => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.getElementsByTagName('iframe')[0];
};

export const cssToObject = (css: string): Object => {
  const rules = css.split(';').filter((str) => str !== '').map((str) => str.trim());
  return rules.reduce((result, rule) => {
    const [prop, val] = rule.split(':').map((str) => str.trim());
    result[camelCase(prop)] = val; // eslint-disable-line no-param-reassign
    return result;
  }, {});
};

export const attributesToObject = (element: Element): Object => (
  [].reduce.call(element.attributes, (ret, { nodeName, nodeValue }) => {
    ret[nodeName] = nodeValue; // eslint-disable-line no-param-reassign
    return ret;
  }, {})
);

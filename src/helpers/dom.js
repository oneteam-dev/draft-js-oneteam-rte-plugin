// @flow

import camelCase from 'lodash/camelCase';
import includes from 'lodash/includes';
import findKey from 'lodash/findKey';
import kebabCase from 'lodash/kebabCase';

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

const attrNameMap = {
  allowfullscreen: 'allowFullScreen',
  frameborder: 'frameBorder',
  accesskey: 'accessKey',
  allowtransparency: 'allowTransparency',
  autocomplete: 'autoComplete',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  charset: 'charSet',
  classid: 'classID',
  class: 'className',
  colspan: 'colSpan',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  enctype: 'encType',
  formaction: 'formAction',
  formencType: 'formEncType',
  formmethod: 'formMethod',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  hreflang: 'hrefLang',
  for: 'htmlFor',
  inputmode: 'inputMode',
  keyparams: 'keyParams',
  keytype: 'keyType',
  marginheight: 'marginHeight',
  marginwidth: 'marginWidth',
  maxlength: 'maxLength',
  mediagroup: 'mediaGroup',
  minlength: 'minLength',
  novalidate: 'noValidate',
  readonly: 'readOnly',
  rowspan: 'rowSpan',
  spellcheck: 'spellCheck',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  tabindex: 'tabIndex',
  usemap: 'useMap'
};

export const attributesToObject = (element: Element): Object => (
  [].reduce.call(element.attributes, (ret, { nodeName, nodeValue }) => {
    const name = attrNameMap.hasOwnProperty(nodeName) ? attrNameMap[nodeName] : camelCase(nodeName);
    ret[name] = nodeValue === '' ? true : nodeValue; // eslint-disable-line no-param-reassign
    return ret;
  }, {})
);

const encodeAttr = (text: string): string => (
  /* eslint-disable newline-per-chained-call */
  text
    .split('&').join('&amp;')
    .split('<').join('&lt;')
    .split('>').join('&gt;')
    .split('"').join('&quot;')
    /* eslint-enable newline-per-chained-call */
);

export const stringifyAttributes = (attrs: ?Object, ignoreEncodeKeys: Array<string> = []): string => {
  if (!attrs) {
    return '';
  }

  return Object.keys(attrs)
    .map((k) => {
      const attrValue = attrs[k];
      const key = includes(attrNameMap, k) ? findKey(attrNameMap, (v) => v === k) : kebabCase(k);
      if (attrValue === true) {
        return ` ${key}`;
      } else if (attrValue) {
        return ` ${key}="${includes(ignoreEncodeKeys, k) ? attrValue : encodeAttr(`${attrValue}`)}"`;
      }
      return '';
    })
    .join('');
};

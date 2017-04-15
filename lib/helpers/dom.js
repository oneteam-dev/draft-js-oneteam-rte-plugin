'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyAttributes = exports.attributesToObject = exports.cssToObject = exports.extractIFrameNode = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _findKey = require('lodash/findKey');

var _findKey2 = _interopRequireDefault(_findKey);

var _kebabCase = require('lodash/kebabCase');

var _kebabCase2 = _interopRequireDefault(_kebabCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractIFrameNode = exports.extractIFrameNode = function extractIFrameNode(html) {
  var el = document.createElement('div');
  el.innerHTML = html;
  return el.getElementsByTagName('iframe')[0];
};

var cssToObject = exports.cssToObject = function cssToObject(css) {
  var rules = css.split(';').filter(function (str) {
    return str !== '';
  }).map(function (str) {
    return str.trim();
  });
  return rules.reduce(function (result, rule) {
    var _rule$split$map = rule.split(':').map(function (str) {
      return str.trim();
    }),
        _rule$split$map2 = _slicedToArray(_rule$split$map, 2),
        prop = _rule$split$map2[0],
        val = _rule$split$map2[1];

    result[(0, _camelCase2.default)(prop)] = val; // eslint-disable-line no-param-reassign
    return result;
  }, {});
};

var attrNameMap = {
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

var attributesToObject = exports.attributesToObject = function attributesToObject(element) {
  return [].reduce.call(element.attributes, function (ret, _ref) {
    var nodeName = _ref.nodeName,
        nodeValue = _ref.nodeValue;

    var name = attrNameMap.hasOwnProperty(nodeName) ? attrNameMap[nodeName] : (0, _camelCase2.default)(nodeName);
    ret[name] = nodeValue === '' ? true : nodeValue; // eslint-disable-line no-param-reassign
    return ret;
  }, {});
};

var encodeAttr = function encodeAttr(text) {
  return (
    /* eslint-disable newline-per-chained-call */
    text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;')
    /* eslint-enable newline-per-chained-call */

  );
};

var stringifyAttributes = exports.stringifyAttributes = function stringifyAttributes(attrs) {
  var ignoreEncodeKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!attrs) {
    return '';
  }

  return Object.keys(attrs).map(function (k) {
    var attrValue = attrs ? attrs[k] : '';
    var key = (0, _includes2.default)(attrNameMap, k) ? (0, _findKey2.default)(attrNameMap, function (v) {
      return v === k;
    }) : (0, _kebabCase2.default)(k);
    if (attrValue === true) {
      return ' ' + key;
    } else if (attrValue) {
      return ' ' + key + '="' + ((0, _includes2.default)(ignoreEncodeKeys, k) ? attrValue : encodeAttr('' + attrValue)) + '"';
    }
    return '';
  }).join('');
};
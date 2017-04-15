'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENTITY_ATTR_MAP = undefined;

var _ENTITY_ATTR_MAP;

var _draftJs = require('draft-js');

var _constants = require('../../../constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Map entity data to element attributes.
var ENTITY_ATTR_MAP = exports.ENTITY_ATTR_MAP = (_ENTITY_ATTR_MAP = {}, _defineProperty(_ENTITY_ATTR_MAP, _constants.ENTITY_TYPES.DOWNLOAD_LINK, { url: 'href', rel: 'rel', title: 'title', className: 'class', size: 'size', name: 'name' }), _defineProperty(_ENTITY_ATTR_MAP, _constants.ENTITY_TYPES.LINK, { url: 'href', rel: 'rel', title: 'title', className: 'class', href: 'href' }), _defineProperty(_ENTITY_ATTR_MAP, _constants.ENTITY_TYPES.IMAGE, { src: 'src', height: 'height', width: 'width', alt: 'alt', className: 'class', 'data-original-url': 'href' }), _defineProperty(_ENTITY_ATTR_MAP, 'IMG', { src: 'src', height: 'height', width: 'width', alt: 'alt', className: 'class', title: 'title' }), _defineProperty(_ENTITY_ATTR_MAP, _constants.ENTITY_TYPES.IFRAME, {
  src: 'src',
  height: 'height',
  width: 'width',
  name: 'name',
  title: 'title',
  className: 'class',
  allowFullScreen: 'allowfullscreen',
  frameBorder: 'frameborder',
  sandbox: 'sandbox',
  style: 'style'
}), _defineProperty(_ENTITY_ATTR_MAP, _constants.ENTITY_TYPES.WEB_CARD, {
  url: 'url',
  imageRemoved: 'imageremoved'
}), _ENTITY_ATTR_MAP);

// Map entity data to element attributes.
var dataToAttr = function dataToAttr(entityType, entity) {
  var attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
  var data = entity.getData();
  var attrs = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var dataKey = _step.value;

      var dataValue = data[dataKey];
      if (attrMap.hasOwnProperty(dataKey)) {
        var attrKey = attrMap[dataKey];
        attrs[attrKey] = dataValue;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return attrs;
};

exports.default = dataToAttr;
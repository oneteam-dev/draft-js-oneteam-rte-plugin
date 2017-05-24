'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractAttributes = function extractAttributes(node, attrMap) {
  var attr = {};
  Object.keys(attrMap).forEach(function (k) {
    var v = attrMap[k];
    if (typeof v === 'string') {
      attr[k] = node.getAttribute(v);
      node.removeAttribute(v);
    }
  });
  return attr;
};

var convertToAnchor = function convertToAnchor(node, component, attrMap) {
  var child = node.firstChild;
  var attr = extractAttributes(node, attrMap);
  var anchorAttrMap = attrMap.anchor || {};
  while (child) {
    if (child.nodeName.toLowerCase() === 'a') {
      attr = (0, _extend2.default)(attr, extractAttributes(child, anchorAttrMap));
      var target = component + ':' + JSON.stringify(attr);
      child.setAttribute('target', target);
      child.innerHTML = '.';
      return node;
    }
    child = child.nextSibling;
  }
  return node;
};

exports.default = convertToAnchor;
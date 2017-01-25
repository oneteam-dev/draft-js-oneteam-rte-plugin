"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var unwrapFirstChild = function unwrapFirstChild(node, childNodeName) {
  var parent = node.parentNode;
  var children = node.childNodes;
  for (var i = 0; i < children.length; i += 1) {
    var child = children[i];
    if (child.nodeName.toLowerCase() === childNodeName) {
      node.removeChild(child);
      parent.insertBefore(child, node);
      parent.removeChild(node);
      return child;
    }
  }
  return node;
};

exports.default = unwrapFirstChild;
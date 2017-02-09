"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    "span",
    { className: "link" },
    children
  );
};

Link.propTypes = {
  children: _react.PropTypes.node.isRequired
};

exports.default = Link;
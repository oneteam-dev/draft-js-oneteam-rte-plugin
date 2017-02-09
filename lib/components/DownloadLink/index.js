"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DownloadLink = function DownloadLink(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    "span",
    { className: "download-link" },
    children
  );
};

DownloadLink.propTypes = {
  children: _react.PropTypes.node.isRequired
};

exports.default = DownloadLink;
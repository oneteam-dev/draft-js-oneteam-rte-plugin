'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _unionClassNames = require('union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.onMouseDown = function (e) {
      var onMouseDown = _this.props.onMouseDown;

      if ((0, _isFunction2.default)(onMouseDown)) {
        e.preventDefault();
        onMouseDown();
      }
    }, _this.onClick = function (e) {
      var onClick = _this.props.onClick;

      if ((0, _isFunction2.default)(onClick)) {
        e.preventDefault();
        onClick();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          children = _props.children;

      var activeClassName = (0, _unionClassNames2.default)('active', theme.active);
      var containerClassName = (0, _unionClassNames2.default)('toolbar-button', theme.button, activeClassName);
      var innerClassName = (0, _unionClassNames2.default)('toolbar-button__inner', theme.inner);
      var bodyClassName = (0, _unionClassNames2.default)('toolbar-button__body', theme.inner);
      return _react2.default.createElement(
        'span',
        {
          className: containerClassName,
          onMouseDown: this.onMouseDown,
          onClick: this.onClick
        },
        _react2.default.createElement(
          'span',
          { className: innerClassName },
          _react2.default.createElement(
            'span',
            { className: bodyClassName },
            children || 'Button'
          )
        )
      );
    }
  }]);

  return Button;
}(_react.Component);

exports.default = Button;
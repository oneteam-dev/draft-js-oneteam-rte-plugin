'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _unionClassNames = require('union-class-names');

var _unionClassNames2 = _interopRequireDefault(_unionClassNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Image = function Image(props) {
  var block = props.block,
      className = props.className,
      _props$theme = props.theme,
      theme = _props$theme === undefined ? {} : _props$theme,
      otherProps = _objectWithoutProperties(props, ['block', 'className', 'theme']);

  var blockProps = otherProps.blockProps,
      customStyleMap = otherProps.customStyleMap,
      customStyleFn = otherProps.customStyleFn,
      decorator = otherProps.decorator,
      forceSelection = otherProps.forceSelection,
      offsetKey = otherProps.offsetKey,
      selection = otherProps.selection,
      tree = otherProps.tree,
      elementProps = _objectWithoutProperties(otherProps, ['blockProps', 'customStyleMap', 'customStyleFn', 'decorator', 'forceSelection', 'offsetKey', 'selection', 'tree']);

  var combinedClassName = (0, _unionClassNames2.default)(theme.image, className);

  var _Entity$get$getData = _draftJs.Entity.get(block.getEntityAt(0)).getData(),
      src = _Entity$get$getData.src,
      alt = _Entity$get$getData.alt,
      title = _Entity$get$getData.title;

  return _react2.default.createElement('img', _extends({}, elementProps, {
    src: src,
    alt: alt,
    title: title,
    role: 'presentation',
    className: combinedClassName
  }));
};

exports.default = Image;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _modifiers = require('../modifiers');

var modifiers = _interopRequireWildcard(_modifiers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createBoundModifiers = function createBoundModifiers(store) {
  return Object.keys(modifiers).reduce(function (ret, key) {
    return _extends({}, ret, _defineProperty({}, key, function () {
      var editorState = store.getEditorState();

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var newEditorState = modifiers[key].apply(modifiers, [editorState].concat(args));
      if (newEditorState !== editorState) {
        store.setEditorState(newEditorState);
      }
    }));
  }, {});
};

exports.default = createBoundModifiers;
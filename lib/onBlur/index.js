'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _insertWebCardsIfNeeded = require('../modifiers/insertWebCardsIfNeeded');

var _insertWebCardsIfNeeded2 = _interopRequireDefault(_insertWebCardsIfNeeded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import type { Config } from '../types/Config';
var createOnBlur = function createOnBlur() {
  return function (event, _ref) {
    var getEditorState = _ref.getEditorState,
        setEditorState = _ref.setEditorState;

    setTimeout(function () {
      // Not changed state if do not do this
      var editorState = getEditorState();
      var newContentState = (0, _insertWebCardsIfNeeded2.default)(editorState);
      if (newContentState !== editorState) {
        setEditorState(newContentState);
      }
    }, 0);
  };
};

exports.default = createOnBlur;
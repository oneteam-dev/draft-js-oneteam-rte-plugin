'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urlRegex = require('url-regex');

var _urlRegex2 = _interopRequireDefault(_urlRegex);

var _insertText = require('../modifiers/insertText');

var _insertText2 = _interopRequireDefault(_insertText);

var _insertWebCards = require('../modifiers/insertWebCards');

var _insertWebCards2 = _interopRequireDefault(_insertWebCards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHandlePastedText = function createHandlePastedText() {
  return function (text, html, _ref) {
    var getEditorState = _ref.getEditorState,
        setEditorState = _ref.setEditorState;

    if (!text) {
      return 'not-handled';
    }

    var urls = text.match((0, _urlRegex2.default)());
    if (urls) {
      var editorState = getEditorState();
      setEditorState((0, _insertWebCards2.default)((0, _insertText2.default)(editorState, text), urls));
      return 'handled';
    }
    return 'not-handled';
  };
};

exports.default = createHandlePastedText;
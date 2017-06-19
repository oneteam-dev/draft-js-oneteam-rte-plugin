'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _urlRegex = require('url-regex');

var _urlRegex2 = _interopRequireDefault(_urlRegex);

var _processText = require('./processText');

var _processText2 = _interopRequireDefault(_processText);

var _insertText = require('../modifiers/insertText');

var _insertText2 = _interopRequireDefault(_insertText);

var _insertWebCards = require('../modifiers/insertWebCards');

var _insertWebCards2 = _interopRequireDefault(_insertWebCards);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHandlePastedText = function createHandlePastedText() {
  return function (text, html, editorState, _ref) {
    var setEditorState = _ref.setEditorState;

    if (!text) {
      return 'not-handled';
    }

    var currentBlockType = _draftJs.RichUtils.getCurrentBlockType(editorState);
    var urls = text.match((0, _urlRegex2.default)());

    if (currentBlockType === _constants.CODE_BLOCK) {
      setEditorState((0, _insertText2.default)(editorState, text));
      return 'handled';
    } else if (urls && currentBlockType !== _constants.CODE_BLOCK) {
      setEditorState((0, _insertWebCards2.default)((0, _processText2.default)(editorState, text), urls));
      return 'handled';
    }
    return 'not-handled';
  };
};

exports.default = createHandlePastedText;
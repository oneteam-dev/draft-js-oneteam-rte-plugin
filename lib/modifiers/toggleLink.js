'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _toggleEntity = require('./toggleEntity');

var _toggleEntity2 = _interopRequireDefault(_toggleEntity);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toggleLink = function toggleLink(editorState) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var selection = editorState.getSelection();

  if (selection.isCollapsed()) {
    return editorState;
  }

  var entityKey = url ? editorState.getCurrentContent().createEntity(_constants.LINK, 'MUTABLE', { url: url }).getLastCreatedEntityKey() : null;
  return (0, _toggleEntity2.default)(editorState, entityKey);
};

exports.default = toggleLink;
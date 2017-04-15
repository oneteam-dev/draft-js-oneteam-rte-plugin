'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _handleTabToInsertIndent = require('./handleTabToInsertIndent');

var _handleTabToInsertIndent2 = _interopRequireDefault(_handleTabToInsertIndent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createOnTab = function createOnTab(config) {
  return function (e, pluginFunctions) {
    if ((0, _handleTabToInsertIndent2.default)(e, pluginFunctions)) {
      return;
    }

    var editorState = pluginFunctions.getEditorState();
    var newEditorState = _draftJs.RichUtils.onTab(e, editorState, config.maxDepth);
    if (newEditorState !== editorState) {
      pluginFunctions.setEditorState(newEditorState);
    }
  };
};

exports.default = createOnTab;
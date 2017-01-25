'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _splitBlockInContentStateIfCursorAtStart = require('../modifiers/splitBlockInContentStateIfCursorAtStart');

var _splitBlockInContentStateIfCursorAtStart2 = _interopRequireDefault(_splitBlockInContentStateIfCursorAtStart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleReturnToSplitBlockIfCursorAtStart = function handleReturnToSplitBlockIfCursorAtStart(editorState, config, _ref) {
  var setEditorState = _ref.setEditorState;

  var selection = editorState.getSelection();
  if (!selection.isCollapsed() || selection.getStartOffset() !== 0) {
    return false;
  }
  setEditorState((0, _splitBlockInContentStateIfCursorAtStart2.default)(editorState));
  return true;
};

exports.default = handleReturnToSplitBlockIfCursorAtStart;
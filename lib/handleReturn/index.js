'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleReturnWithCommand = require('./handleReturnWithCommand');

var _handleReturnWithCommand2 = _interopRequireDefault(_handleReturnWithCommand);

var _handleReturnListItem = require('./handleReturnListItem');

var _handleReturnListItem2 = _interopRequireDefault(_handleReturnListItem);

var _handleReturnToInsertWebCard = require('./handleReturnToInsertWebCard');

var _handleReturnToInsertWebCard2 = _interopRequireDefault(_handleReturnToInsertWebCard);

var _handleReturnToSplitBlockIfCursorAtStart = require('./handleReturnToSplitBlockIfCursorAtStart');

var _handleReturnToSplitBlockIfCursorAtStart2 = _interopRequireDefault(_handleReturnToSplitBlockIfCursorAtStart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createHandleReturn = function createHandleReturn(config) {
  return function (event, pluginFunctions) {
    var editorState = pluginFunctions.getEditorState();

    if ((0, _handleReturnWithCommand2.default)(event, config)) {
      return 'handled';
    }

    if ((0, _handleReturnListItem2.default)(editorState, config, pluginFunctions)) {
      return 'handled';
    }

    if ((0, _handleReturnToInsertWebCard2.default)(editorState, config, pluginFunctions)) {
      return 'handled';
    }

    if ((0, _handleReturnToSplitBlockIfCursorAtStart2.default)(editorState, config, pluginFunctions)) {
      return 'handled';
    }

    return 'not-handled';
  };
};

exports.default = createHandleReturn;
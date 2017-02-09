'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _insertWebCardsIfNeeded = require('../modifiers/insertWebCardsIfNeeded');

var _insertWebCardsIfNeeded2 = _interopRequireDefault(_insertWebCardsIfNeeded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleReturnToInsertWebCard = function handleReturnToInsertWebCard(editorState, config, _ref) {
  var setEditorState = _ref.setEditorState;

  var newEditorState = (0, _insertWebCardsIfNeeded2.default)(editorState);
  if (editorState !== newEditorState) {
    setEditorState(newEditorState);
    return true;
  }
  return false;
};

exports.default = handleReturnToInsertWebCard;
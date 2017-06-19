'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _insertIndent = require('../modifiers/insertIndent');

var _insertIndent2 = _interopRequireDefault(_insertIndent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleTabToInsertIndent = function handleTabToInsertIndent(e, _ref) {
  var getEditorState = _ref.getEditorState,
      setEditorState = _ref.setEditorState;

  var editorState = getEditorState();

  var newEditorState = (0, _insertIndent2.default)(editorState);
  if (editorState !== newEditorState) {
    e.preventDefault();
    setEditorState(newEditorState);
    return true;
  }
  return false;
};

exports.default = handleTabToInsertIndent;
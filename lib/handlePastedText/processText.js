'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _DraftPasteProcessor = require('draft-js/lib/DraftPasteProcessor');

var _DraftPasteProcessor2 = _interopRequireDefault(_DraftPasteProcessor);

var _getEntityKeyForSelection = require('draft-js/lib/getEntityKeyForSelection');

var _getEntityKeyForSelection2 = _interopRequireDefault(_getEntityKeyForSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processText = function processText(editorState, text) {
  var character = _draftJs.CharacterMetadata.create({
    style: editorState.getCurrentInlineStyle(),
    entity: (0, _getEntityKeyForSelection2.default)(editorState.getCurrentContent(), editorState.getSelection())
  });

  var textFragment = _DraftPasteProcessor2.default.processText(text.split('\n'), character);

  var textMap = _draftJs.BlockMapBuilder.createFromArray(textFragment);
  var withInsertedText = _draftJs.Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), textMap);

  return _draftJs.EditorState.push(editorState, withInsertedText, 'insert-fragment');
};

exports.default = processText;
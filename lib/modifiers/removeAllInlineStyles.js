'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

var _getCurrentBlock = require('../utils/getCurrentBlock');

var _getCurrentBlock2 = _interopRequireDefault(_getCurrentBlock);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var removeAllInlineStyles = function removeAllInlineStyles(editorState) {
  var otherInlineStyles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var selection = editorState.getSelection();
  var content = editorState.getCurrentContent();
  var newContent = void 0;

  if (selection.isCollapsed()) {
    var block = (0, _getCurrentBlock2.default)(editorState);
    var characterList = block.getCharacterList();
    var key = block.getKey();
    var updatedCharacterList = characterList.map(function (c) {
      return c.set('style', c.get('style').clear());
    });
    var updatedBlock = block.set('characterList', updatedCharacterList);
    var blockMap = content.getBlockMap().merge(_defineProperty({}, key, updatedBlock));
    newContent = content.merge({ blockMap: blockMap });
  } else {
    newContent = Object.keys(_extends({}, _constants.INLINE_STYLES, otherInlineStyles)).reduce(function (contentState, style) {
      return _draftJs.Modifier.removeInlineStyle(contentState, selection, style);
    }, content);
  }

  return _draftJs.EditorState.push(editorState, newContent, 'change-inline-style');
};

exports.default = removeAllInlineStyles;
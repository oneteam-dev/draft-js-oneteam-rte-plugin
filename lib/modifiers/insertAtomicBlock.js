'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _AtomicBlockUtils = require('draft-js/lib/AtomicBlockUtils');

var _AtomicBlockUtils2 = _interopRequireDefault(_AtomicBlockUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {EditorState} editorState
 * @param {string} entityType
 * @param {string} mutability `IMMUTABLE`, `MUTABLE` or `SEGMENTED`
 * @param {Object} data
 * @param {string} character [character = ' ']
 * @returns {EditorState}
 */
var insertAtomicBlock = function insertAtomicBlock(editorState, entityType, mutability, data) {
  var character = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ' ';

  var entityKey = _draftJs.Entity.create(entityType, mutability, data);
  return _AtomicBlockUtils2.default.insertAtomicBlock(editorState, entityKey, character);
};

exports.default = insertAtomicBlock;
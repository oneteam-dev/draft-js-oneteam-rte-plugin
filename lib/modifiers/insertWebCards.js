'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _insertAtomicBlock = require('./insertAtomicBlock');

var _insertAtomicBlock2 = _interopRequireDefault(_insertAtomicBlock);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertWebCards = function insertWebCards(editorState, urls) {
  return urls.reduce(function (state, url) {
    return (0, _insertAtomicBlock2.default)(state, _constants.WEB_CARD, 'IMMUTABLE', { url: url });
  }, editorState);
};

exports.default = insertWebCards;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

var _insertAtomicBlock = require('./insertAtomicBlock');

var _insertAtomicBlock2 = _interopRequireDefault(_insertAtomicBlock);

var _dom = require('../helpers/dom');

var domHelper = _interopRequireWildcard(_dom);

var _constants = require('../constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var insertIFrameAtomicBlock = function insertIFrameAtomicBlock(editorState, html) {
  var iframe = domHelper.extractIFrameNode(html);
  if (!iframe) {
    return editorState;
  }

  var attributes = domHelper.attributesToObject(iframe);
  return (0, _insertAtomicBlock2.default)(editorState, _constants.IFRAME, 'IMMUTABLE', _extends({}, attributes));
};

exports.default = insertIFrameAtomicBlock;
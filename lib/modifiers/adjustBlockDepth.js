'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _adjustBlockDepthForContentState = require('draft-js/lib/adjustBlockDepthForContentState');

var _adjustBlockDepthForContentState2 = _interopRequireDefault(_adjustBlockDepthForContentState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var adjustBlockDepth = function adjustBlockDepth(editorState, adjustment, maxDepth) {
  var withAdjustment = (0, _adjustBlockDepthForContentState2.default)(editorState.getCurrentContent(), editorState.getSelection(), adjustment, maxDepth);

  return _draftJs.EditorState.push(editorState, withAdjustment, 'adjust-depth');
};

exports.default = adjustBlockDepth;
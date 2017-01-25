'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// // ********************************************************************
// //
// // This is temporary. we should re-implementation
// import convertHTML from 'oneteam-rte-converter/lib/convertFromHTML';
// import convertState from 'oneteam-rte-converter/lib/editorStateToHTML';
// // ********************************************************************

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _handleKeyCommand = require('./handleKeyCommand');

var _handleKeyCommand2 = _interopRequireDefault(_handleKeyCommand);

var _handleReturn = require('./handleReturn');

var _handleReturn2 = _interopRequireDefault(_handleReturn);

var _onTab = require('./onTab');

var _onTab2 = _interopRequireDefault(_onTab);

var _onBlur = require('./onBlur');

var _onBlur2 = _interopRequireDefault(_onBlur);

var _blockRendererFn = require('./blockRendererFn');

var _blockRendererFn2 = _interopRequireDefault(_blockRendererFn);

var _handlePastedText = require('./handlePastedText');

var _handlePastedText2 = _interopRequireDefault(_handlePastedText);

var _handlePastedFiles = require('./handlePastedFiles');

var _handlePastedFiles2 = _interopRequireDefault(_handlePastedFiles);

var _blockStyleFn = require('./blockStyleFn');

var _blockStyleFn2 = _interopRequireDefault(_blockStyleFn);

var _Link = require('./decorators/Link');

var _Link2 = _interopRequireDefault(_Link);

var _DownloadLink = require('./decorators/DownloadLink');

var _DownloadLink2 = _interopRequireDefault(_DownloadLink);

var _createBoundModifiers = require('./helpers/createBoundModifiers');

var _createBoundModifiers2 = _interopRequireDefault(_createBoundModifiers);

var _convertHTMLToContentState = require('./encoding/convertHTMLToContentState');

var _convertHTMLToContentState2 = _interopRequireDefault(_convertHTMLToContentState);

var _convertContentStateToHTML = require('./encoding/convertContentStateToHTML');

var _convertContentStateToHTML2 = _interopRequireDefault(_convertContentStateToHTML);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = {
  maxDepth: 4,
  atomicBlockRenderMap: {}
};

var createOneteamRTEPlugin = function createOneteamRTEPlugin(options) {
  var store = {};

  var config = (0, _merge2.default)({}, defaultConfig, options);

  return {
    // blockRenderMap: Map({
    //   'pdf-preview': {
    //     element: 'pdf-preview'
    //   }
    // }),
    convertHTML: _convertHTMLToContentState2.default,
    convertState: _convertContentStateToHTML2.default,
    store: store,
    initialize: function initialize(pluginFunctions) {
      Object.keys(pluginFunctions).forEach(function (k) {
        store[k] = pluginFunctions[k];
      });
    },


    decorators: [(0, _Link2.default)(config), (0, _DownloadLink2.default)(config)],

    handleKeyCommand: (0, _handleKeyCommand2.default)(config),

    handleReturn: (0, _handleReturn2.default)(config),

    onTab: (0, _onTab2.default)(config),

    blockRendererFn: (0, _blockRendererFn2.default)(config),

    handlePastedText: (0, _handlePastedText2.default)(config),

    // should change to configurable
    customStyleMap: _extends({}, _constants.OLD_INLINE_STYLES, {
      CODE: {
        padding: '2px 4px',
        fontFamily: 'Menlo, Monaco, Consolas, Courier New, monospace',
        color: '#c7254e',
        backgroundColor: '#f9f2f4',
        borderRadius: 4
      }
    }),

    blockStyleFn: (0, _blockStyleFn2.default)(config),

    handlePastedFiles: (0, _handlePastedFiles2.default)(config),

    onBlur: (0, _onBlur2.default)(config),

    modifiers: (0, _createBoundModifiers2.default)(store)
  };
};

exports.default = createOneteamRTEPlugin;
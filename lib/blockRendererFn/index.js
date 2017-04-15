'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _Image = require('../components/Image');

var _Image2 = _interopRequireDefault(_Image);

var _atomicBlockRenderer = require('./atomicBlockRenderer');

var _atomicBlockRenderer2 = _interopRequireDefault(_atomicBlockRenderer);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createBlockRendererFn = function createBlockRendererFn(config) {
  return function (block, pluginFunctions) {
    if ((0, _isFunction2.default)(config.customBlockRendererFn)) {
      var ret = config.customBlockRendererFn(block, pluginFunctions);
      if (ret) {
        return ret;
      }
    }

    if (block.getType() === _constants.ATOMIC) {
      var atomicBlockRenderMap = config.atomicBlockRenderMap[_constants.FILE_PLACEHOLDER] ? (0, _merge3.default)({}, config.atomicBlockRenderMap, _defineProperty({}, _constants.FILE_PLACEHOLDER, (0, _decorateComponentWithProps2.default)(config.atomicBlockRenderMap[_constants.FILE_PLACEHOLDER], { ImageComponent: _Image2.default }))) : config.atomicBlockRenderMap;
      var atomicBlockRendererConfig = (0, _merge3.default)({}, config, { atomicBlockRenderMap: atomicBlockRenderMap });
      return (0, _atomicBlockRenderer2.default)(atomicBlockRendererConfig, block, pluginFunctions);
    }
  };
};

exports.default = createBlockRendererFn;
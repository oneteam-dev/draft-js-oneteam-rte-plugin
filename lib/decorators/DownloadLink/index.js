'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createDownloadLinkStrategy = require('./createDownloadLinkStrategy');

var _createDownloadLinkStrategy2 = _interopRequireDefault(_createDownloadLinkStrategy);

var _DownloadLink = require('../../components/DownloadLink');

var _DownloadLink2 = _interopRequireDefault(_DownloadLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDownloadLinkDecorator = function createDownloadLinkDecorator(config) {
  return {
    strategy: (0, _createDownloadLinkStrategy2.default)(config),
    component: _DownloadLink2.default
  };
};

exports.default = createDownloadLinkDecorator;
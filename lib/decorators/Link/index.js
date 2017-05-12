'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createLinkStrategy = require('./createLinkStrategy');

var _createLinkStrategy2 = _interopRequireDefault(_createLinkStrategy);

var _Link = require('../../components/Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLinkDecorator = function createLinkDecorator(config) {
  return {
    strategy: (0, _createLinkStrategy2.default)(config),
    component: _Link2.default
  };
};

exports.default = createLinkDecorator;
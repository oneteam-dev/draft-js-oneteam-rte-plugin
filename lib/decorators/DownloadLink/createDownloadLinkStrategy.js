'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../../constants');

var _createFindEntitiesBy = require('../../utils/createFindEntitiesBy');

var _createFindEntitiesBy2 = _interopRequireDefault(_createFindEntitiesBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDownloadLinkStrategy = function createDownloadLinkStrategy() {
  return (0, _createFindEntitiesBy2.default)(_constants.DOWNLOAD_LINK);
};

exports.default = createDownloadLinkStrategy;
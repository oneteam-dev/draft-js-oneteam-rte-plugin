'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasValidLinkText = function hasValidLinkText(link) {
  (0, _invariant2.default)(link instanceof HTMLAnchorElement, 'Link must be an HTMLAnchorElement.');
  var protocol = link.protocol;
  return protocol === 'http:' || protocol === 'https:';
};

var isTextAndHrefSameValue = function isTextAndHrefSameValue(element) {
  return element.getAttribute('href') === element.textContent;
};

var shouldCreateLinkEntity = function shouldCreateLinkEntity(tagName, element) {
  return tagName === 'a' && element.href && hasValidLinkText(element) && !isTextAndHrefSameValue(element);
};

exports.default = shouldCreateLinkEntity;
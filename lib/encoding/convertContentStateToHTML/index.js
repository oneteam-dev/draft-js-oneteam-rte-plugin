'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _htmlclean = require('htmlclean');

var _htmlclean2 = _interopRequireDefault(_htmlclean);

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _he = require('he');

var _he2 = _interopRequireDefault(_he);

var _MarkupGenerator = require('./MarkupGenerator');

var _MarkupGenerator2 = _interopRequireDefault(_MarkupGenerator);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultOptions = {
  blockRenderers: _defineProperty({}, _constants.BLOCK_TYPES.CODE_BLOCK, function (block) {
    var lang = block.getData().get('language');
    var text = block.getText();
    var escapedText = _he2.default.escape(text);
    return '<pre' + (lang ? ' data-language="' + lang + '"' : '') + '>' + escapedText + '</pre>';
  })
};

var convertContentStateToHTML = function convertContentStateToHTML(content, options) {
  var html = new _MarkupGenerator2.default(content, (0, _merge2.default)({}, defaultOptions, options)).generate();
  return (0, _htmlclean2.default)(html);
};

exports.default = convertContentStateToHTML;
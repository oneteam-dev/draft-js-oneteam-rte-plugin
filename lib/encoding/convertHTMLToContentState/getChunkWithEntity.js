'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

var _constants = require('./constants');

var _constants2 = require('../../constants');

var _dom = require('../../helpers/dom');

var getChunkWithEntity = function getChunkWithEntity(tagName, element, inlineStyle, depth) {
  if (tagName === 'img') {
    var data = {
      src: element.src,
      alt: element.alt,
      'data-original-url': element.parentNode.getAttribute('href')
    };
    var entityKey = _draftJs.Entity.create(_constants2.ENTITY_TYPES.IMAGE, 'IMMUTABLE', data);
    return {
      text: _constants.CR + ' ' + _constants.CR,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(entityKey),
      blocks: [{
        type: _constants2.BLOCK_TYPES.ATOMIC,
        depth: depth
      }, {
        type: _constants2.BLOCK_TYPES.UNSTYLED,
        depth: depth
      }]
    };
  }

  if (tagName === 'web-card') {
    var _data = { url: element.getAttribute('url') };
    var hasImageremoved = element.hasAttribute('imageremoved');
    if (hasImageremoved) {
      _data.imageRemoved = hasImageremoved;
    }
    var _entityKey = _draftJs.Entity.create(_constants2.ENTITY_TYPES.WEB_CARD, 'IMMUTABLE', _data);
    return {
      text: _constants.CR + ' ' + _constants.CR,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(_entityKey),
      blocks: [{
        type: _constants2.BLOCK_TYPES.ATOMIC,
        depth: depth
      }, {
        type: _constants2.BLOCK_TYPES.UNSTYLED,
        depth: depth
      }]
    };
  }

  if (tagName === 'file-placeholder') {
    var url = element.getAttribute('url');
    var contentType = element.getAttribute('content-type');
    var _data2 = {
      url: url,
      contentType: contentType,
      download_url: url,
      name: element.getAttribute('name'),
      created_at: element.getAttribute('uploaded-at'),
      created_by: {
        name: element.getAttribute('uploaded-by')
      },
      size: parseInt(element.getAttribute('size'), 10),
      content_type: contentType,
      status: 'completed'
    };
    if (element.parentNode.querySelectorAll('pdf-preview').length > 0) {
      var pdfPreview = element.parentNode.querySelector('pdf-preview');
      var src = pdfPreview.getAttribute('src');
      _data2.preview_url = src;
      if (contentType === 'application/pdf') {
        _data2.original_url = src;
      } else {
        var width = pdfPreview.getAttribute('width');
        var height = pdfPreview.getAttribute('height');
        _data2.original_url = src;
        _data2.thumbnails = {
          preview: {
            width: width ? parseInt(width, 10) : undefined,
            height: height ? parseInt(height, 10) : undefined,
            content_type: 'application/pdf',
            url: src
          }
        };
      }
    }
    var _entityKey2 = _draftJs.Entity.create('FILE_PLACEHOLDER', 'IMMUTABLE', _data2);
    return {
      text: _constants.CR + ' ' + _constants.CR,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(_entityKey2),
      blocks: [{
        type: _constants2.BLOCK_TYPES.ATOMIC,
        depth: depth
      }, {
        type: _constants2.BLOCK_TYPES.UNSTYLED,
        depth: depth
      }]
    };
  }

  if (tagName === 'pdf-preview' && element.parentNode.querySelectorAll('file-placeholder').length === 0) {
    var _src = element.getAttribute('src');
    var _contentType = element.getAttribute('original-file-content-type');
    var _width = element.getAttribute('width');
    var _height = element.getAttribute('height');
    var _data3 = {
      download_url: element.getAttribute('original-file-url'),
      content_type: _contentType,
      name: element.getAttribute('original-file-name')
    };
    if (_contentType === 'application/pdf') {
      _data3.original_url = _src;
    } else {
      _data3.preview_url = _src;
      _data3.thumbnails = {
        preview: {
          width: _width ? parseInt(_width, 10) : undefined,
          height: _height ? parseInt(_height, 10) : undefined,
          content_type: 'application/pdf',
          url: _src
        }
      };
    }
    var anchor = element.querySelector('a');
    var size = anchor ? parseInt(anchor.getAttribute('data-size'), 10) : null;
    if (size) {
      _data3.size = size;
    }

    var _entityKey3 = _draftJs.Entity.create('PLACEHOLDER', 'IMMUTABLE', _data3);
    return {
      text: _constants.CR + ' ' + _constants.CR,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(_entityKey3),
      blocks: [{
        type: _constants2.BLOCK_TYPES.ATOMIC,
        depth: depth
      }, {
        type: _constants2.BLOCK_TYPES.UNSTYLED,
        depth: depth
      }]
    };
  }

  if (tagName === 'iframe') {
    var _entityKey4 = _draftJs.Entity.create(_constants2.ENTITY_TYPES.IFRAME, 'IMMUTABLE', _extends({}, (0, _dom.attributesToObject)(element)));
    return {
      text: _constants.CR + ' ' + _constants.CR,
      inlines: Array(3).fill(inlineStyle),
      entities: Array(3).fill(_entityKey4),
      blocks: [{
        type: _constants2.BLOCK_TYPES.ATOMIC,
        depth: depth
      }, {
        type: _constants2.BLOCK_TYPES.UNSTYLED,
        depth: depth
      }]
    };
  }

  return null;
};

exports.default = getChunkWithEntity;
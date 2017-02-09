'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draftJs = require('draft-js');

var _getEntityRanges = require('draft-js-utils/lib/getEntityRanges');

var _getEntityRanges2 = _interopRequireDefault(_getEntityRanges);

var _urlRegex = require('url-regex');

var _urlRegex2 = _interopRequireDefault(_urlRegex);

var _kebabCase = require('lodash/kebabCase');

var _kebabCase2 = _interopRequireDefault(_kebabCase);

var _constants = require('../../constants');

var _dataToAttr = require('./helpers/dataToAttr');

var _dataToAttr2 = _interopRequireDefault(_dataToAttr);

var _getTag = require('./helpers/getTag');

var _getTag2 = _interopRequireDefault(_getTag);

var _getWrapperTag = require('./helpers/getWrapperTag');

var _getWrapperTag2 = _interopRequireDefault(_getWrapperTag);

var _canHaveDepth = require('./helpers/canHaveDepth');

var _canHaveDepth2 = _interopRequireDefault(_canHaveDepth);

var _encodeContent = require('./helpers/encodeContent');

var _encodeContent2 = _interopRequireDefault(_encodeContent);

var _dom = require('../../helpers/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_constants.INLINE_STYLES.UNDERLINE = 'UNDERLINE';

var BOLD = _constants.INLINE_STYLES.BOLD,
    CODE = _constants.INLINE_STYLES.CODE,
    ITALIC = _constants.INLINE_STYLES.ITALIC,
    STRIKETHROUGH = _constants.INLINE_STYLES.STRIKETHROUGH,
    UNDERLINE = _constants.INLINE_STYLES.UNDERLINE;


var INDENT = '  ';

var MarkupGenerator = function () {
  function MarkupGenerator(contentState) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MarkupGenerator);

    this.contentState = contentState;
    this.options = options;
  }

  _createClass(MarkupGenerator, [{
    key: 'generate',
    value: function generate() {
      this.output = [];
      this.blocks = this.contentState.getBlocksAsArray();
      this.totalBlocks = this.blocks.length;
      this.currentBlock = 0;
      this.indentLevel = 0;
      this.wrapperTag = null;
      while (this.currentBlock < this.totalBlocks) {
        this.processBlock();
      }
      this.closeWrapperTag();
      return this.output.join('').trim();
    }
  }, {
    key: 'processBlock',
    value: function processBlock() {
      var blockRenderers = this.options.blockRenderers;

      var block = this.blocks[this.currentBlock];
      var blockType = block.getType();
      var newWrapperTag = (0, _getWrapperTag2.default)(blockType);
      if (this.wrapperTag !== newWrapperTag) {
        if (this.wrapperTag) {
          this.closeWrapperTag();
        }
        if (newWrapperTag) {
          this.openWrapperTag(newWrapperTag);
        }
      }
      this.indent();

      // Allow blocks to be rendered using a custom renderer.
      var customRenderer = blockRenderers != null && blockRenderers.hasOwnProperty(blockType) ? blockRenderers[blockType] : null;
      var customRendererOutput = customRenderer ? customRenderer(block) : null;
      // Renderer can return null, which will cause processing to continue as normal.
      if (customRendererOutput != null) {
        this.output.push(customRendererOutput);
        this.output.push('\n');
        this.currentBlock += 1;
        return;
      }

      this.writeStartTag(blockType);
      this.output.push(this.renderBlockContent(block));
      // Look ahead and see if we will nest list.
      var nextBlock = this.getNextBlock();
      if (this.hasListBlock(blockType, nextBlock, block)) {
        this.output.push('\n');
        // This is a litle hacky: temporarily stash our current wrapperTag and
        // render child list(s).
        var thisWrapperTag = this.wrapperTag;
        this.wrapperTag = null;
        this.indentLevel += 1;
        this.currentBlock += 1;
        this.processBlocksAtDepth(nextBlock.getDepth());
        this.wrapperTag = thisWrapperTag;
        this.indentLevel -= 1;
        this.indent();
      } else {
        this.currentBlock += 1;
      }
      this.writeEndTag(blockType);
    }
  }, {
    key: 'hasListBlock',
    value: function hasListBlock(blockType, nextBlock, block) {
      return (0, _canHaveDepth2.default)(blockType) && !!nextBlock && nextBlock.getDepth() === block.getDepth() + 1;
    }
  }, {
    key: 'processBlocksAtDepth',
    value: function processBlocksAtDepth(depth) {
      var block = this.blocks[this.currentBlock];
      while (block && block.getDepth() === depth) {
        this.processBlock();
        block = this.blocks[this.currentBlock];
      }
      this.closeWrapperTag();
    }
  }, {
    key: 'getNextBlock',
    value: function getNextBlock() {
      return this.blocks[this.currentBlock + 1];
    }
  }, {
    key: 'writeStartTag',
    value: function writeStartTag(blockType) {
      var tag = (0, _getTag2.default)(blockType);
      switch (blockType) {
        case _constants.OLD_BLOCK_TYPES.ALIGN_RIGHT:
          this.output.push('<' + tag + ' style="text-align: right;">');
          break;
        case _constants.OLD_BLOCK_TYPES.ALIGN_CENTER:
          this.output.push('<' + tag + ' style="text-align: center;">');
          break;
        case _constants.OLD_BLOCK_TYPES.ALIGN_JUSTIFY:
          this.output.push('<' + tag + ' style="text-align: justify;">');
          break;
        case _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM:
          this.output.push('<' + tag + ' class="task-list-item">');
          break;
        default:
          this.output.push('<' + tag + '>');
      }
    }
  }, {
    key: 'writeEndTag',
    value: function writeEndTag(blockType) {
      var tag = (0, _getTag2.default)(blockType);
      this.output.push('</' + tag + '>\n');
    }
  }, {
    key: 'openWrapperTag',
    value: function openWrapperTag(wrapperTag) {
      this.wrapperTag = wrapperTag;
      this.indent();
      this.output.push('<' + wrapperTag + '>\n');
      this.indentLevel += 1;
    }
  }, {
    key: 'closeWrapperTag',
    value: function closeWrapperTag() {
      if (this.wrapperTag) {
        this.indentLevel -= 1;
        this.indent();
        this.output.push('</' + this.wrapperTag + '>\n');
        this.wrapperTag = null;
      }
    }
  }, {
    key: 'indent',
    value: function indent() {
      this.output.push(INDENT.repeat(this.indentLevel));
    }
  }, {
    key: 'renderBlockContent',
    value: function renderBlockContent(block) {
      var blockType = block.getType();
      var blockText = block.getText();
      if (blockText === '') {
        // Prevent element collapse if completely empty.
        return _encodeContent.BREAK;
      }
      blockText = this.preserveWhitespace(blockText);
      var charMetaList = block.getCharacterList();
      var entityPieces = (0, _getEntityRanges2.default)(blockText, charMetaList);

      var ret = entityPieces.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            entityKey = _ref2[0],
            stylePieces = _ref2[1];

        var entity = entityKey ? _draftJs.Entity.get(entityKey) : null;
        var entityType = entity == null ? null : entity.getType();

        var content = stylePieces.map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              text = _ref4[0],
              style = _ref4[1];

          // let encodedText = blockType === BLOCK_TYPES.CODE_BLOCK ? text : encodeContent(text);
          var encodedText = (0, _encodeContent2.default)(text);
          var originalEncodedText = encodedText;

          var oldStyles = style.toArray().filter(function (s) {
            return Object.keys(_constants.OLD_INLINE_STYLES).indexOf(s) !== -1;
          });
          if (oldStyles.length > 0) {
            (function () {
              var styles = oldStyles.reduce(function (result, s) {
                return Object.keys(_constants.OLD_INLINE_STYLES[s]).reduce(function (r, prop) {
                  r[prop] = _constants.OLD_INLINE_STYLES[s][prop]; // eslint-disable-line no-param-reassign
                  return r;
                }, result);
              }, {});

              var stringifyStyles = Object.keys(styles).map(function (prop) {
                var val = prop === 'fontSize' ? styles[prop] + 'px' : styles[prop];
                return (0, _kebabCase2.default)(prop) + ': ' + val + ';';
              }).join(' ');
              encodedText = '<span style="' + stringifyStyles + '">' + encodedText + '</span>';
            })();
          }

          // These are reverse alphabetical by tag name.
          if (style.has(BOLD)) {
            encodedText = '<strong>' + encodedText + '</strong>';
          }
          if (style.has(UNDERLINE)) {
            encodedText = '<ins>' + encodedText + '</ins>';
          }
          if (style.has(ITALIC)) {
            encodedText = '<em>' + encodedText + '</em>';
          }
          if (style.has(STRIKETHROUGH)) {
            encodedText = '<del>' + encodedText + '</del>';
          }
          if (style.has(CODE)) {
            // If our block type is CODE then we are already wrapping the whole
            // block in a `<code>` so don't wrap inline code elements.
            encodedText = blockType === _constants.BLOCK_TYPES.CODE_BLOCK ? encodedText : '<code>' + encodedText + '</code>';
          }
          if (entityType != null && entityType === _constants.ENTITY_TYPES.LINK) {
            var attrs = _dataToAttr.ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? (0, _dataToAttr2.default)(entityType, entity) : null;
            var strAttrs = (0, _dom.stringifyAttributes)(attrs);
            encodedText = '<a' + strAttrs + ' target="_blank">' + encodedText + '</a>';
          } else if ((0, _urlRegex2.default)().test(originalEncodedText)) {
            encodedText = encodedText.replace((0, _urlRegex2.default)(), function (match) {
              return '<a href="' + match + '" target="_blank">' + match + '</a>';
            });
          }
          return encodedText;
        }).join('');

        if (entityType != null && entityType === _constants.ENTITY_TYPES.DOWNLOAD_LINK) {
          var attrs = _dataToAttr.ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? (0, _dataToAttr2.default)(entityType, entity) : null;
          return '<a href="' + attrs.href + '" target="_blank" data-name="' + attrs.name + '" data-size="' + attrs.size + '" download>' + content + '</a>';
        } else if (entityType != null && (entityType === _constants.ENTITY_TYPES.IMAGE || entityType === 'IMG')) {
          var data = entity.getData();

          if (data.status && data.status !== 'completed') {
            return content;
          }
          var _attrs = _dataToAttr.ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? (0, _dataToAttr2.default)(entityType, entity) : null;
          return '<a href="' + (_attrs.href || _attrs.src) + '" target="_blank" class="uploaded-image">' + ('<img src="' + _attrs.src + '"' + (_attrs.alt ? ' alt="' + _attrs.alt + '"' : '') + (_attrs.title ? ' title="' + _attrs.title + '"' : '') + '/>') + '</a>';
        } else if (entityType != null && entityType === _constants.ENTITY_TYPES.IFRAME) {
          var _attrs2 = _dataToAttr.ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? (0, _dataToAttr2.default)(entityType, entity) : null;
          var strAttrs = (0, _dom.stringifyAttributes)(_attrs2);
          return '<iframe' + strAttrs + '></iframe>';
        } else if (entityType != null && entityType === _constants.ENTITY_TYPES.WEB_CARD) {
          var _attrs3 = _dataToAttr.ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? (0, _dataToAttr2.default)(entityType, entity) : null;
          var _strAttrs = (0, _dom.stringifyAttributes)(_attrs3, ['url']);
          return '<web-card' + _strAttrs + ' />';
        } else if (entityType != null && entityType === 'PLACEHOLDER') {
          var _data = entity.getData();
          var isOriginalPDF = _data.content_type === 'application/pdf';
          var srcData = !isOriginalPDF && _data.thumbnails && _data.thumbnails.preview ? _data.thumbnails.preview : _data;
          var widthAttr = srcData.width ? ' width="' + srcData.width + '"' : '';
          var heightAttr = srcData.height ? ' height="' + srcData.height + '"' : '';
          return '<pdf-preview src="' + _data[isOriginalPDF ? 'original_url' : 'preview_url'] + '" original-file-url="' + _data.download_url + '" original-file-name="' + _data.name + '" original-file-content-type="' + _data.content_type + '"' + widthAttr + heightAttr + '><a href="' + _data.download_url + '" data-name="' + _data.name + '" data-size="' + _data.size + '" target="_blank" download>' + _data.name + '</a></pdf-preview>';
        } else if (entityType != null && entityType === 'FILE_PLACEHOLDER') {
          var _data2 = entity.getData();

          if (_data2.status !== 'completed') {
            return content;
          }

          var child = '<a href="' + _data2.download_url + '" data-name="' + _data2.name + '" data-size="' + _data2.size + '" target="_blank" download>' + _data2.name + '</a>';

          var filePlaceholder = '<file-placeholder url="' + _data2.download_url + '" name="' + _data2.name + '" size="' + _data2.size + '" content-type="' + _data2.contentType + '"' + (_data2.created_at ? ' uploaded-at="' + _data2.created_at + '"' : '') + (_data2.created_by ? ' uploaded-by="' + _data2.created_by.name + '"' : '') + '>' + child + '</file-placeholder>';

          var _isOriginalPDF = _data2.content_type === 'application/pdf' || _data2.contentType === 'application/pdf';
          var isPdfPreview = _isOriginalPDF || _data2.thumbnails && _data2.thumbnails.preview && _data2.thumbnails.preview.content_type === 'application/pdf';

          if (isPdfPreview) {
            var _srcData = !_isOriginalPDF && _data2.thumbnails && _data2.thumbnails.preview ? _data2.thumbnails.preview : _data2;
            var _widthAttr = _srcData.width ? ' width="' + _srcData.width + '"' : '';
            var _heightAttr = _srcData.height ? ' height="' + _srcData.height + '"' : '';

            filePlaceholder = filePlaceholder + '<pdf-preview src="' + _data2[_isOriginalPDF ? 'original_url' : 'preview_url'] + '" original-file-url="' + _data2.download_url + '" original-file-name="' + _data2.name + '" original-file-content-type="' + _data2.content_type + '"' + _widthAttr + _heightAttr + '></pdf-preview>';
          }
          return filePlaceholder;
        }
        return content;
      }).join('');

      if (blockType === _constants.BLOCK_TYPES.CHECKABLE_LIST_ITEM) {
        var isChecked = block.getData().get('checked');
        ret = '<input type="checkbox"' + (isChecked ? ' checked ' : ' ') + 'disabled /><span>' + ret + '</span>';
      }

      return ret;
    }
  }, {
    key: 'preserveWhitespace',
    value: function preserveWhitespace(text) {
      var length = text.length;
      // Prevent leading/trailing/consecutive whitespace collapse.

      var newText = new Array(length);
      for (var i = 0; i < length; i += 1) {
        if (text[i] === ' ' && (i === 0 || i === length - 1 || text[i - 1] === ' ')) {
          newText[i] = '\xA0';
        } else {
          newText[i] = text[i];
        }
      }
      return newText.join('');
    }
  }]);

  return MarkupGenerator;
}();

exports.default = MarkupGenerator;
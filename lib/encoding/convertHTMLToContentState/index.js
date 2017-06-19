'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _DraftEntity = require('draft-js/lib/DraftEntity');

var _DraftEntity2 = _interopRequireDefault(_DraftEntity);

var _getSafeBodyFromHTML = require('draft-js/lib/getSafeBodyFromHTML');

var _getSafeBodyFromHTML2 = _interopRequireDefault(_getSafeBodyFromHTML);

var _sanitizeDraftText = require('draft-js/lib/sanitizeDraftText');

var _sanitizeDraftText2 = _interopRequireDefault(_sanitizeDraftText);

var _immutable = require('immutable');

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

var _getEmptyChunk = require('./getEmptyChunk');

var _getEmptyChunk2 = _interopRequireDefault(_getEmptyChunk);

var _getWhitespaceChunk = require('./getWhitespaceChunk');

var _getWhitespaceChunk2 = _interopRequireDefault(_getWhitespaceChunk);

var _getSoftNewlineChunk = require('./getSoftNewlineChunk');

var _getSoftNewlineChunk2 = _interopRequireDefault(_getSoftNewlineChunk);

var _getBlockDividerChunk = require('./getBlockDividerChunk');

var _getBlockDividerChunk2 = _interopRequireDefault(_getBlockDividerChunk);

var _getBlockTypeForTag = require('./getBlockTypeForTag');

var _getBlockTypeForTag2 = _interopRequireDefault(_getBlockTypeForTag);

var _processInlineTag = require('./processInlineTag');

var _processInlineTag2 = _interopRequireDefault(_processInlineTag);

var _joinChunks = require('./joinChunks');

var _joinChunks2 = _interopRequireDefault(_joinChunks);

var _getChunkWithEntity = require('./getChunkWithEntity');

var _getChunkWithEntity2 = _interopRequireDefault(_getChunkWithEntity);

var _normalizeHTML = require('./normalizeHTML');

var _normalizeHTML2 = _interopRequireDefault(_normalizeHTML);

var _containsSemanticBlockMarkup = require('./helpers/containsSemanticBlockMarkup');

var _containsSemanticBlockMarkup2 = _interopRequireDefault(_containsSemanticBlockMarkup);

var _shouldCreateLinkEntity = require('./helpers/shouldCreateLinkEntity');

var _shouldCreateLinkEntity2 = _interopRequireDefault(_shouldCreateLinkEntity);

var _constants = require('./constants');

var _constants2 = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lastBlock = void 0; /**
                         * Copyright (c) 2013-present, Facebook, Inc.
                         * All rights reserved.
                         *
                         * This source code is licensed under the BSD-style license found in the
                         * LICENSE file in the root directory of this source tree. An additional grant
                         * of patent rights can be found in the PATENTS file in the same directory.
                         */

/* eslint-disable no-param-reassign */

var genFragment = function genFragment(node, inlineStyle, lastList, inBlock, blockTags, depth, inEntity, options) {
  var nodeName = node.nodeName.toLowerCase();
  var newBlock = false;
  var nextBlockType = _constants2.BLOCK_TYPES.UNSTYLED;
  var lastLastBlock = lastBlock;

  // Base Case
  if (nodeName === '#text') {
    var text = node.textContent;
    if (text.trim() === '' && inBlock !== 'pre') {
      return (0, _getWhitespaceChunk2.default)(inEntity);
    }
    if (inBlock !== 'pre') {
      // Can't use empty string because MSWord
      text = text.replace(_constants.REGEX_LF, _constants.SPACE);
    }

    // save the last block so we can use it later
    lastBlock = nodeName;

    var entities = Array(text.length).fill(inEntity);

    var offsetChange = 0;
    var textEntities = options.textToEntity(text).sort(function (r1, r2) {
      return r1.offset - r2.offset;
    });
    textEntities.forEach(function (_ref) {
      var entity = _ref.entity,
          offset = _ref.offset,
          length = _ref.length,
          result = _ref.result;

      var adjustedOffset = offset + offsetChange;

      if (result === null || result === undefined) {
        result = text.substr(adjustedOffset, length);
      }

      var textArray = text.split('');
      textArray.splice.bind(textArray, adjustedOffset, length).apply(textArray, result.split(''));
      text = textArray.join('');

      entities.splice.bind(entities, adjustedOffset, length).apply(entities, Array(result.length).fill(entity));

      offsetChange += result.length - length;
    });

    return {
      text: text,
      inlines: Array(text.length).fill(inlineStyle),
      entities: entities,
      blocks: []
    };
  }

  var chunkWithEntity = (0, _getChunkWithEntity2.default)(nodeName, node, inlineStyle, depth);

  if (chunkWithEntity) {
    return chunkWithEntity;
  }

  // save the last block so we can use it later
  lastBlock = nodeName;

  // BR tags
  if (nodeName === 'br') {
    if (lastLastBlock === 'br' && (!inBlock || (0, _getBlockTypeForTag2.default)(inBlock, lastList, node) === _constants2.BLOCK_TYPES.UNSTYLED)) {
      return (0, _getBlockDividerChunk2.default)(_constants2.BLOCK_TYPES.UNSTYLED, depth);
    }
    return (0, _getSoftNewlineChunk2.default)();
  }

  var chunk = (0, _getEmptyChunk2.default)();
  var newChunk = null;

  // Inline tags
  inlineStyle = (0, _processInlineTag2.default)(nodeName, node, inlineStyle);

  // Handle lists
  if (nodeName === 'ul' || nodeName === 'ol') {
    if (lastList) {
      depth += 1;
    }
    lastList = nodeName;
  }

  // Block Tags
  if (!inBlock && blockTags.indexOf(nodeName) !== -1) {
    chunk = (0, _getBlockDividerChunk2.default)((0, _getBlockTypeForTag2.default)(nodeName, lastList, node), depth, node);
    inBlock = nodeName;
    newBlock = true;
  } else if (lastList && inBlock === 'li' && nodeName === 'li') {
    chunk = (0, _getBlockDividerChunk2.default)((0, _getBlockTypeForTag2.default)(nodeName, lastList, node), depth, node);
    inBlock = nodeName;
    newBlock = true;
    if (lastList === 'ul') {
      if (node.classList.contains('task-list-item')) {
        nextBlockType = _constants2.BLOCK_TYPES.CHECKABLE_LIST_ITEM;
      } else {
        nextBlockType = _constants2.BLOCK_TYPES.UNORDERED_LIST_ITEM;
      }
    } else {
      nextBlockType = _constants2.BLOCK_TYPES.ORDERED_LIST_ITEM;
    }
  }

  // Recurse through children
  var child = node.firstChild;
  if (child != null) {
    nodeName = child.nodeName.toLowerCase();
  }

  var entityId = null;
  var href = null;

  while (child) {
    if ((0, _shouldCreateLinkEntity2.default)(nodeName, child)) {
      // href = new URI(child.href).toString();
      href = child.href;
      if (child.hasAttribute('download')) {
        // TODO: update this when DraftEntity removed  entirely
        entityId = _DraftEntity2.default.__create(_constants2.ENTITY_TYPES.DOWNLOAD_LINK, 'MUTABLE', {
          url: href,
          name: child.getAttribute('data-name'),
          size: child.getAttribute('data-size')
        });
      } else {
        // TODO: update this when DraftEntity removed  entirely
        entityId = _DraftEntity2.default.__create(_constants2.ENTITY_TYPES.LINK, 'MUTABLE', { url: href });
      }
    } else {
      entityId = undefined;
    }

    newChunk = genFragment(child, inlineStyle, lastList, inBlock, blockTags, depth, entityId || inEntity, options);

    chunk = (0, _joinChunks2.default)(chunk, newChunk);
    var sibling = child.nextSibling;

    // Put in a newline to break up blocks inside blocks
    if (sibling && blockTags.indexOf(nodeName) >= 0 && inBlock) {
      chunk = (0, _joinChunks2.default)(chunk, (0, _getSoftNewlineChunk2.default)());
    }
    if (sibling) {
      nodeName = sibling.nodeName.toLowerCase();
    }
    child = sibling;
  }

  if (newBlock) {
    chunk = (0, _joinChunks2.default)(chunk, (0, _getBlockDividerChunk2.default)(nextBlockType, depth));
  }

  return chunk;
};

var getChunkForHTML = function getChunkForHTML(html, DOMBuilder, options) {
  html = (0, _normalizeHTML2.default)(html);

  var safeBody = DOMBuilder(html);
  if (!safeBody) {
    return null;
  }
  lastBlock = null;

  // Sometimes we aren't dealing with content that contains nice semantic
  // tags. In this case, use divs to separate everything out into paragraphs
  // and hope for the best.
  var workingBlocks = (0, _containsSemanticBlockMarkup2.default)(html) ? _constants.BASE_BLOCK_TAG_NAMES : ['div'];

  // Start with -1 block depth to offset the fact that we are passing in a fake
  // UL block to start with.
  var chunk = genFragment(safeBody, (0, _immutable.OrderedSet)(), 'ul', null, workingBlocks, -1, null, options);

  // join with previous block to prevent weirdness on paste
  if (chunk.text.indexOf(_constants.CR) === 0) {
    chunk = {
      text: chunk.text.slice(1),
      inlines: chunk.inlines.slice(1),
      entities: chunk.entities.slice(1),
      blocks: chunk.blocks
    };
  }

  // Kill block delimiter at the end
  if (chunk.text.slice(-1) === _constants.CR) {
    chunk.text = chunk.text.slice(0, -1);
    chunk.inlines = chunk.inlines.slice(0, -1);
    chunk.entities = chunk.entities.slice(0, -1);
    chunk.blocks.pop();
  }

  // If we saw no block tags, put an unstyled one in
  if (chunk.blocks.length === 0) {
    chunk.blocks.push({ type: _constants2.BLOCK_TYPES.UNSTYLED, depth: 0 });
  }

  // Sometimes we start with text that isn't in a block, which is then
  // followed by blocks. Need to fix up the blocks to add in
  // an unstyled block for this content
  if (chunk.text.split(_constants.CR).length === chunk.blocks.length + 1) {
    chunk.blocks.unshift({ type: _constants2.BLOCK_TYPES.UNSTYLED, depth: 0 });
  }

  return chunk;
};

var convertHTMLToContentState = function convertHTMLToContentState(html) {
  var DOMBuilder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _getSafeBodyFromHTML2.default;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { textToEntity: function textToEntity() {
      return [];
    } };

  // Be ABSOLUTELY SURE that the dom builder you pass hare won't execute
  // arbitrary code in whatever environment you're running this in. For an
  // example of how we try to do this in-browser, see getSafeBodyFromHTML.

  var chunk = getChunkForHTML(html, DOMBuilder, options);
  if (chunk == null) {
    return null;
  }
  var start = 0;

  var blockArray = chunk.text.split(_constants.CR).map(function (textBlock, ii) {
    // Make absolutely certain that our text is acceptable.
    textBlock = (0, _sanitizeDraftText2.default)(textBlock);
    var end = start + textBlock.length;
    var inlines = (0, _nullthrows2.default)(chunk).inlines.slice(start, end);
    var entities = (0, _nullthrows2.default)(chunk).entities.slice(start, end);
    var characterList = (0, _immutable.List)(inlines.map(function (style, jj) {
      var data = { style: style, entity: null };
      if (entities[jj]) {
        data.entity = entities[jj];
      }
      return _draftJs.CharacterMetadata.create(data);
    }));
    start = end + 1;

    return new _draftJs.ContentBlock({
      key: (0, _draftJs.genKey)(),
      type: (0, _nullthrows2.default)(chunk).blocks[ii].type,
      depth: (0, _nullthrows2.default)(chunk).blocks[ii].depth,
      data: (0, _nullthrows2.default)(chunk).blocks[ii].data || (0, _immutable.Map)(),
      text: textBlock,
      characterList: characterList
    });
  });

  return _draftJs.ContentState.createFromBlockArray(blockArray);
};

exports.default = convertHTMLToContentState;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _Image = require('../components/Image');

var _Image2 = _interopRequireDefault(_Image);

var _DownloadLink = require('../components/DownloadLink');

var _DownloadLink2 = _interopRequireDefault(_DownloadLink);

var _IFrame = require('../components/IFrame');

var _IFrame2 = _interopRequireDefault(_IFrame);

var _removeBlock = require('../modifiers/removeBlock');

var _removeBlock2 = _interopRequireDefault(_removeBlock);

var _mergeEntityData = require('../modifiers/mergeEntityData');

var _mergeEntityData2 = _interopRequireDefault(_mergeEntityData);

var _replaceToAtomicBlock = require('../modifiers/replaceToAtomicBlock');

var _replaceToAtomicBlock2 = _interopRequireDefault(_replaceToAtomicBlock);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var atomicBlockRenderer = function atomicBlockRenderer(config, block, pluginFunctions) {
  var entityKey = block.getEntityAt(0);
  if (!entityKey) {
    return null;
  }

  // TODO: update this when DraftEntity removed entirely
  var entity = _draftJs.Entity.__get(entityKey);

  if ((0, _isFunction2.default)(config.customAtomicBlockRendererFn)) {
    var atomicBlock = config.customAtomicBlockRendererFn(entity, block, pluginFunctions);
    if (atomicBlock) {
      return atomicBlock;
    }
  }

  var type = entity.getType();

  switch (type) {
    case _constants.WEB_CARD:
      {
        var getEditorState = pluginFunctions.getEditorState,
            setEditorState = pluginFunctions.setEditorState;

        var editorState = getEditorState();

        var _entity$getData = entity.getData(),
            url = _entity$getData.url,
            imageRemoved = _entity$getData.imageRemoved;

        return {
          component: config.atomicBlockRenderMap[_constants.WEB_CARD],
          editable: false,
          props: {
            url: url,
            imageRemoved: imageRemoved,
            onDelete: function onDelete() {
              return setEditorState((0, _removeBlock2.default)(editorState, block));
            },
            onRemoveImage: function onRemoveImage() {
              setEditorState((0, _mergeEntityData2.default)(editorState, entityKey, { imageRemoved: true }));
            }
          }
        };
      }
    case _constants.PLACEHOLDER:
      {
        var data = entity.getData();
        return {
          component: config.atomicBlockRenderMap[_constants.PLACEHOLDER],
          props: {
            name: data.name,
            contentType: data.content_type
          },
          editable: false
        };
      }
    case _constants.FILE_PLACEHOLDER:
      {
        var _getEditorState = pluginFunctions.getEditorState,
            _setEditorState = pluginFunctions.setEditorState;

        var _editorState = _getEditorState();

        return {
          component: config.atomicBlockRenderMap[_constants.FILE_PLACEHOLDER],
          props: _extends({}, entity.getData(), {
            onComplete: function onComplete(data) {
              if ((0, _isFunction2.default)(config.onCompleteFileUpload)) {
                config.onCompleteFileUpload(data, block);
              }

              var newEditorState = void 0;
              if (data.isImage) {
                newEditorState = (0, _replaceToAtomicBlock2.default)(_editorState, block, _constants.IMAGE, 'IMMUTABLE', {
                  src: data.src,
                  alt: data.alt,
                  'data-original-url': data['data-original-url']
                });
              } else {
                newEditorState = (0, _mergeEntityData2.default)(_editorState, entityKey, data);
              }

              _setEditorState(newEditorState);
            },
            onDelete: function onDelete() {
              return _setEditorState((0, _removeBlock2.default)(_editorState, block));
            }
          }),
          editable: false
        };
      }
    case _constants.IMAGE:
      return {
        component: config.Image || _Image2.default,
        editable: false
      };
    case _constants.DOWNLOAD_LINK:
      return {
        component: config.DownloadLink || _DownloadLink2.default,
        editable: true
      };
    case _constants.IFRAME:
      return {
        component: config.IFrame || _IFrame2.default,
        editable: false
      };
    default: // noop
  }
};

exports.default = atomicBlockRenderer;
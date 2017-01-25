'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PDFPreview = function PDFPreview(props) {
  var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData(),
      target = _Entity$get$getData.target;

  var fileProps = JSON.parse(target.replace(/^pdf-preview:/, ''));
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'dl',
      { contentEditable: 'false' },
      _react2.default.createElement(
        'dt',
        null,
        'previewURL'
      ),
      _react2.default.createElement(
        'dd',
        null,
        fileProps.previewURL
      ),
      _react2.default.createElement(
        'dt',
        null,
        'orignalFileURL'
      ),
      _react2.default.createElement(
        'dd',
        null,
        fileProps.orignalFileURL
      ),
      _react2.default.createElement(
        'dt',
        null,
        'orignalFileName'
      ),
      _react2.default.createElement(
        'dd',
        null,
        fileProps.orignalFileName
      ),
      _react2.default.createElement(
        'dt',
        null,
        'orignalFileContentType'
      ),
      _react2.default.createElement(
        'dd',
        null,
        fileProps.orignalFileContentType
      ),
      _react2.default.createElement(
        'dt',
        null,
        'width'
      ),
      _react2.default.createElement(
        'dd',
        null,
        fileProps.width
      ),
      _react2.default.createElement(
        'dt',
        null,
        'height'
      ),
      _react2.default.createElement(
        'dd',
        null,
        fileProps.height
      ),
      _react2.default.createElement(
        'dt',
        null,
        'size'
      ),
      _react2.default.createElement(
        'dd',
        null,
        fileProps.size
      )
    ),
    _react2.default.createElement(
      'span',
      { style: { opacity: 0 } },
      props.children
    )
  );
};

exports.default = PDFPreview;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var joinChunks = function joinChunks(A, B) {
  // Sometimes two blocks will touch in the DOM and we need to strip the
  // extra delimiter to preserve niceness.
  var lastInA = A.text.slice(-1);
  var firstInB = B.text.slice(0, 1);

  if (lastInA === _constants.CR && firstInB === _constants.CR) {
    A.text = A.text.slice(0, -1); // eslint-disable-line no-param-reassign
    A.inlines.pop();
    A.entities.pop();
    A.blocks.pop();
  }

  // Kill whitespace after blocks
  if (lastInA === _constants.CR) {
    if (B.text === _constants.SPACE) {
      return A;
    } else if (B.text === _constants.LF && A.text === _constants.CR) {
      return B;
    } else if (firstInB === _constants.SPACE || firstInB === _constants.LF) {
      B.text = B.text.slice(1); // eslint-disable-line no-param-reassign
      B.inlines.shift();
      B.entities.shift();
    }
  }

  return {
    text: A.text + B.text,
    inlines: A.inlines.concat(B.inlines),
    entities: A.entities.concat(B.entities),
    blocks: A.blocks.concat(B.blocks)
  };
};

exports.default = joinChunks;
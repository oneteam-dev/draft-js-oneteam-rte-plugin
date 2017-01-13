const { padStart } = require('lodash');

let n = 0;
module.exports = function mockGenerateRandomKey() {
  return padStart(n++, 5, '0');
};

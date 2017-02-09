import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handlePastedFiles from '..';

chai.use(sinonChai);

describe('handlePastedFiles', () => {
  let onPastedFiles;
  it('is function', () => {
    const actual = handlePastedFiles({});
    expect(actual).to.be.a('function');
  });
  it('handled', () => {
    onPastedFiles = sinon.spy();
    const actual = handlePastedFiles({ onPastedFiles })();
    expect(onPastedFiles.calledOnce).to.be.true();
    expect(actual).to.equal('handled');
  });
  it('not-handled', () => {
    const actual = handlePastedFiles({})();
    expect(actual).to.equal('not-handled');
  });
});

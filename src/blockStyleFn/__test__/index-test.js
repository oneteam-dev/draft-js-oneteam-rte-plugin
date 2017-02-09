import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import createBlockStyleFn from '..';

chai.use(sinonChai);

describe('blockRendererFn', () => {
  it('returns function', () => {
    expect(typeof createBlockStyleFn({})).to.equal('function');
  });
  it('returns by customBlockRendererFn', () => {
    expect(
      createBlockStyleFn({
        blockStyleMap: {}
      })({ getType: () => {} }, {})
    ).to.undefined();
  });
  it('returns by customBlockRendererFn', () => {
    expect(
      createBlockStyleFn({
        blockStyleMap: { foo: 'bar' }
      })({ getType: () => 'foo' }, {})
    ).to.equal('bar');
  });
  it('returns by customBlockRendererFn', () => {
    expect(
      createBlockStyleFn({
        blockStyleMap: {}
      })({ getType: () => 'align-right' }, {})
    ).to.equal('align-right');
  });
});

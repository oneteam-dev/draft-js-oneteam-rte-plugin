import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import createBlockRendererFn from '..';

chai.use(sinonChai);

createBlockRendererFn.__Rewire__('atomicBlockRenderer', () => {});

describe('blockRendererFn', () => {
  it('returns function', () => {
    expect(typeof createBlockRendererFn({})).to.equal('function');
  });
  it('returns by customBlockRendererFn', () => {
    expect(
      createBlockRendererFn({
        customBlockRendererFn: () => 'block'
      })({}, {})
    ).to.equal('block');
  });
  it('not returns by customBlockRendererFn', () => {
    expect(
      createBlockRendererFn({
        customBlockRendererFn: () => {}
      })({ getType: () => {}, getEntityAt: () => {} }, {})
    ).to.undefined();
  });
  it('returns by atomicBlockRenderer', () => {
    expect(
      createBlockRendererFn({
        customBlockRendererFn: () => {},
        atomicBlockRenderMap: {}
      })({ getType: () => 'atomic', getEntityAt: () => true }, {})
    ).to.undefined();
  });
});

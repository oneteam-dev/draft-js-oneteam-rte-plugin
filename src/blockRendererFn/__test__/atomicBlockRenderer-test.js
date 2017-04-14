import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Draft from 'draft-js';
import atomicBlockRenderer from '../atomicBlockRenderer';

chai.use(sinonChai);

describe('atomicBlockRenderer', () => {
  let editorState = {};
  const pluginFunctions = {
    getEditorState: () => editorState,
    setEditorState: (state) => { editorState = state; },
  };
  let EntityStub;
  const createEntityStub = (type, data) => ({
    getData: sinon.stub().returns(data),
    getType: sinon.stub().returns(type)
  });

  describe('WEB_CARD callbacks', () => {
    before(() => {
      const e = createEntityStub('WEB_CARD', {});
      EntityStub = sinon.stub(Draft.Entity, '__get').callsFake(() => e);
      atomicBlockRenderer.__Rewire__('mergeEntityData', () => 'mergeEntityData');
      atomicBlockRenderer.__Rewire__('removeBlock', () => 'removeBlock');
    });
    after(() => {
      EntityStub.restore();
      atomicBlockRenderer.__ResetDependency__('mergeEntityData');
      atomicBlockRenderer.__ResetDependency__('removeBlock');
    });
    it('call event listeners', () => {
      const ret = atomicBlockRenderer(
        { atomicBlockRenderMap: {} },
        { getEntityAt: () => 'key1' },
        pluginFunctions
      );
      ret.props.onDelete();
      expect(editorState).to.equal('removeBlock');
      ret.props.onRemoveImage();
      expect(editorState).to.equal('mergeEntityData');
    });
  });

  describe('FILE_PLACEHOLDER callbacks', () => {
    before(() => {
      const e = createEntityStub('FILE_PLACEHOLDER', {});
      EntityStub = sinon.stub(Draft.Entity, '__get').callsFake(() => e);
      atomicBlockRenderer.__Rewire__('removeBlock', () => 'removeBlock');
      atomicBlockRenderer.__Rewire__('mergeEntityData', () => 'mergeEntityData');
      atomicBlockRenderer.__Rewire__('replaceToAtomicBlock', () => 'replaceToAtomicBlock');
    });
    after(() => {
      EntityStub.restore();
      atomicBlockRenderer.__ResetDependency__('removeBlock');
      atomicBlockRenderer.__ResetDependency__('mergeEntityData');
      atomicBlockRenderer.__ResetDependency__('replaceToAtomicBlock');
    });
    it('call event listeners', () => {
      const onCompleteFileUploadSpy = sinon.spy();
      const ret = atomicBlockRenderer(
        { atomicBlockRenderMap: {}, onCompleteFileUpload: onCompleteFileUploadSpy },
        { getEntityAt: () => 'key1' },
        pluginFunctions
      );
      ret.props.onDelete();
      expect(editorState).to.equal('removeBlock');
      ret.props.onComplete({});
      expect(editorState).to.equal('mergeEntityData');
      expect(onCompleteFileUploadSpy.called).to.true();
      ret.props.onComplete({ isImage: true });
      expect(editorState).to.equal('replaceToAtomicBlock');
    });
  });

  ['WEB_CARD', 'FILE_PLACEHOLDER', 'PLACEHOLDER', 'IMAGE', 'IFRAME', 'DOWNLOAD_LINK', 'noop'].forEach((type) => {
    describe('returns atomic block', () => {
      beforeEach(() => {
        const e = createEntityStub(type, {});
        EntityStub = sinon.stub(Draft.Entity, '__get').callsFake(() => e);
      });
      afterEach(() => {
        EntityStub.restore();
      });
      it(`returns ${type}`, () => {
        const expected = atomicBlockRenderer(
          { atomicBlockRenderMap: {} },
          { getEntityAt: () => 'key1' },
          pluginFunctions
        );

        expect(typeof expected).to.equal(type === 'noop' ? 'undefined' : 'object');
      });
    });
  });

  describe('null', () => {
    beforeEach(() => {
      const e = createEntityStub('null', {});
      EntityStub = sinon.stub(Draft.Entity, '__get').callsFake(() => e);
    });
    afterEach(() => {
      EntityStub.restore();
    });

    it('returns null', () => {
      const expected = atomicBlockRenderer({}, { getEntityAt: () => {} }, pluginFunctions);
      expect(expected).to.null();
    });
  });

  describe('customAtomicBlockRendererFn', () => {
    beforeEach(() => {
      const e = createEntityStub('custom', {});
      EntityStub = sinon.stub(Draft.Entity, '__get').callsFake(() => e);
    });
    afterEach(() => {
      EntityStub.restore();
    });

    it('returns', () => {
      const expected = atomicBlockRenderer({
        customAtomicBlockRendererFn: () => ({ foo: 1 }),
      }, { getEntityAt: () => 'key1' }, pluginFunctions);
      expect(expected.foo).to.equal(1);
    });
  });
});

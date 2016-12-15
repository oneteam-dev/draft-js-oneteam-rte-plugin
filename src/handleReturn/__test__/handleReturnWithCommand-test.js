import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Draft from 'draft-js';
import handleReturnWithCommand from '../handleReturnWithCommand';

chai.use(sinonChai);

describe('handleReturnWithCommand', () => {
  let event;
  let onReturnWithCommand;
  let KeyBindingUtilStub;
  afterEach(() => {
    KeyBindingUtilStub.restore();
    handleReturnWithCommand.__ResetDependency__('onReturnWithCommand');
  });

  it('return false with noop', () => {
    onReturnWithCommand = sinon.spy();
    KeyBindingUtilStub = sinon.stub(Draft.KeyBindingUtil, 'hasCommandModifier', () => false);
    handleReturnWithCommand.__Rewire__('onReturnWithCommand', onReturnWithCommand);
    event = {};

    const actual = handleReturnWithCommand(event, { onReturnWithCommand });
    expect(onReturnWithCommand.called).to.be.false();
    expect(actual).to.be.false();
  });
  it('return true with new editorState', () => {
    onReturnWithCommand = sinon.spy();
    KeyBindingUtilStub = sinon.stub(Draft.KeyBindingUtil, 'hasCommandModifier', () => true);
    handleReturnWithCommand.__Rewire__('onReturnWithCommand', onReturnWithCommand);
    event = {};

    const actual = handleReturnWithCommand(event, { onReturnWithCommand });
    expect(onReturnWithCommand.calledOnce).to.be.true();
    expect(actual).to.be.true();
  });
});

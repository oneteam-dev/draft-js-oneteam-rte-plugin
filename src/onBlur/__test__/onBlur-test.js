import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import onBlur from '..';

chai.use(sinonChai);

describe('onBlur', () => {
  const event = {};
  let insertWebCardsIfNeeded;
  let getEditorState;
  let setEditorState;

  afterEach(() => {
    onBlur.__ResetDependency__('insertWebCardsIfNeeded');
  });
  it('is function', () => {
    const actual = onBlur({});
    expect(actual).to.be.a('function');
  });
  it('noop', function fn(done) {
    this.timeout(50);
    getEditorState = sinon.stub().returns('state0');
    setEditorState = sinon.spy();
    insertWebCardsIfNeeded = sinon.stub().returns('state0');
    onBlur.__Rewire__('insertWebCardsIfNeeded', insertWebCardsIfNeeded);
    onBlur({})(event, { getEditorState, setEditorState });
    setTimeout(() => {
      expect(getEditorState.calledOnce).to.be.true();
      expect(insertWebCardsIfNeeded.calledOnce).to.be.true();
      expect(setEditorState.called).to.be.false();
      done();
    }, 20);
  });
  it('handled with new editorState', function fn(done) {
    this.timeout(50);
    getEditorState = sinon.stub().returns('state0');
    setEditorState = sinon.spy();
    insertWebCardsIfNeeded = sinon.stub().returns('state1');
    onBlur.__Rewire__('insertWebCardsIfNeeded', insertWebCardsIfNeeded);
    onBlur({})(event, { getEditorState, setEditorState });
    setTimeout(() => {
      expect(getEditorState.calledOnce).to.be.true();
      expect(insertWebCardsIfNeeded.calledOnce).to.be.true();
      expect(setEditorState.called).to.be.true();
      done();
    }, 20);
  });
});

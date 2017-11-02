import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import handleReturnToInsertWebCard from '../handleReturnToInsertWebCard';

chai.use(sinonChai);

describe('handleReturnToInsertWebCard', () => {
  let editorState;
  let setEditorState;
  let insertWebCardsIfNeeded;

  afterEach(() => {
    handleReturnToInsertWebCard.__ResetDependency__('insertWebCardsIfNeeded');
  });

  it('return false with noop', () => {
    insertWebCardsIfNeeded = sinon.stub().returns('state0');
    editorState = 'state0';
    setEditorState = sinon.spy();

    handleReturnToInsertWebCard.__Rewire__('insertWebCardsIfNeeded', insertWebCardsIfNeeded);

    const actual = handleReturnToInsertWebCard(editorState, {}, { setEditorState });
    expect(setEditorState.called).to.be.false();
    expect(actual).to.be.false();
  });
  it('return false with `disableWebCardCreation`', () => {
    insertWebCardsIfNeeded = sinon.stub().returns('state0');
    editorState = 'state1';
    setEditorState = sinon.spy();

    handleReturnToInsertWebCard.__Rewire__('insertWebCardsIfNeeded', insertWebCardsIfNeeded);

    const actual = handleReturnToInsertWebCard(editorState, { disableWebCardCreation: true }, { setEditorState });
    expect(setEditorState.called).to.be.false();
    expect(actual).to.be.false();
  });
  it('return true with new editorState', () => {
    insertWebCardsIfNeeded = sinon.stub().returns('newstate');
    editorState = 'state0';
    setEditorState = sinon.spy();

    handleReturnToInsertWebCard.__Rewire__('insertWebCardsIfNeeded', insertWebCardsIfNeeded);

    const actual = handleReturnToInsertWebCard(editorState, {}, { setEditorState });
    expect(setEditorState.calledOnce).to.be.true();
    expect(actual).to.be.true();
  });
});

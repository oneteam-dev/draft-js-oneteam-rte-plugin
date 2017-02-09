import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Draft, { EditorState, SelectionState } from 'draft-js';

import createOneteamRTEPlugin from '..';

chai.use(sinonChai);

describe('draft-js-oneteam-rte-plugin', () => {
  let plugin;
  let store;
  let currentEditorState;
  let newEditorState;
  let currentRawContentState;
  let newRawContentState;
  let currentSelectionState;
  let subject;
  let event;

  let modifierSpy;

  [
    [],
    [{}],
  ].forEach((args) => {
    beforeEach(() => {
      modifierSpy = sinon.spy(() => newEditorState);

      event = new window.KeyboardEvent('keydown');
      sinon.spy(event, 'preventDefault');
      currentSelectionState = new SelectionState({
        anchorKey: 'item1',
        anchorOffset: 0,
        focusKey: 'item1',
        focusOffset: 0,
        isBackward: false,
        hasFocus: true
      });

      newRawContentState = {
        entityMap: {},
        blocks: [{
          key: 'item1',
          text: 'altered!!',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }]
      };
      newEditorState = EditorState.createWithContent(Draft.convertFromRaw(newRawContentState));

      store = {
        setEditorState: sinon.spy(),
        getEditorState: sinon.spy(() => {
          const contentState = Draft.convertFromRaw(currentRawContentState);
          currentEditorState = EditorState.forceSelection(
            EditorState.createWithContent(contentState),
            currentSelectionState);
          return currentEditorState;
        })
      };
      subject = null;
    });

    describe(args.length === 0 ? 'without config' : 'with config', () => {
      beforeEach(() => {
        plugin = createOneteamRTEPlugin(...args);
        subject = () => plugin;
      });

      it('is loaded', () => {
        expect(createOneteamRTEPlugin).to.be.a('function');
        expect(modifierSpy).not.to.have.been.called();
      });
      it('initialize', () => {
        plugin.initialize(store);
        expect(subject().store).to.deep.equal(store);
      });
    });
  });
});

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import Draft, { EditorState, SelectionState } from 'draft-js';
import adjustBlockDepth from '../adjustBlockDepth';

chai.use(sinonChai);

describe('adjustBlockDepth', () => {
  const rawContentState = (type, ...depthes) => ({
    entityMap: {},
    blocks: depthes.map(((depth, i) => ({
      key: `item${i}`,
      text: `test ${i}`,
      type,
      depth,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    })))
  });
  const selectionState = new SelectionState({
    anchorKey: 'item1',
    anchorOffset: 0,
    focusKey: 'item1',
    focusOffset: 0,
    isBackward: false,
    hasFocus: true
  });
  const createEditorState = (...args) => {
    const contentState = Draft.convertFromRaw(rawContentState(...args));
    return EditorState.forceSelection(
      EditorState.createWithContent(contentState),
      selectionState
    );
  };
  [
    'unordered-list-item',
    'ordered-list-item',
    'checkable-list-item'
  ].forEach((type) => {
    describe(type, () => {
      it('adds depth', () => {
        const editorState = createEditorState(type, 0, 0);
        const newEditorState = adjustBlockDepth(editorState, 1, 4);
        expect(
          newEditorState
        ).not.to.equal(
          editorState
        );
        expect(
          Draft.convertToRaw(newEditorState.getCurrentContent())
        ).to.deep.equal(
          rawContentState(type, 0, 1)
        );
      });
    });
  });
});

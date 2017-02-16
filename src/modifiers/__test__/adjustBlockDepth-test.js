import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import Draft from 'draft-js';
import createEditorState from '../../__test__/helpers/createEditorState';
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
  const rawSelectionState = {
    anchorKey: 'item1',
    anchorOffset: 0,
    focusKey: 'item1',
    focusOffset: 0,
    isBackward: false,
    hasFocus: true
  };
  [
    'unordered-list-item',
    'ordered-list-item',
    'checkable-list-item'
  ].forEach((type) => {
    describe(type, () => {
      it('adds depth', () => {
        const editorState = createEditorState(rawContentState(type, 0, 0), rawSelectionState);
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

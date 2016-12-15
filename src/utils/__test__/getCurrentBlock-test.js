import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import Draft, { EditorState, SelectionState } from 'draft-js';
import getCurrentBlock from '../getCurrentBlock';

chai.use(sinonChai);

describe('getCurrentBlock', () => {
  const beforeRawContentState = {
    entityMap: {},
    blocks: [{
      key: 'item1',
      text: '',
      type: 'header-one',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }]
  };
  const selection = new SelectionState({
    anchorKey: 'item1',
    anchorOffset: 0,
    focusKey: 'item1',
    focusOffset: 0,
    isBackward: false,
    hasFocus: true
  });
  const contentState = Draft.convertFromRaw(beforeRawContentState);
  const editorState = EditorState.forceSelection(
    EditorState.createWithContent(contentState),
    selection
  );
  it('correct', () => {
    expect(getCurrentBlock(editorState).getType()).to.equal('header-one');
    expect(getCurrentBlock(editorState).getKey()).to.equal('item1');
  });
});

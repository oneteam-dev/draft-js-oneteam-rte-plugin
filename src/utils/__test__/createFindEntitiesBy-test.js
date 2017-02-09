import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { ContentBlock, CharacterMetadata } from 'draft-js';
import { List } from 'immutable';
import createFindEntitiesBy from '../createFindEntitiesBy';

chai.use(sinonChai);

describe('createFindEntitiesBy', () => {
  // const beforeRawContentState = {
  //   entityMap: {},
  //   blocks: [{
  //     key: 'item1',
  //     text: '',
  //     type: 'header-one',
  //     depth: 0,
  //     inlineStyleRanges: [],
  //     entityRanges: [],
  //     data: {}
  //   }]
  // };
  // const selection = new SelectionState({
  //   anchorKey: 'item1',
  //   anchorOffset: 0,
  //   focusKey: 'item1',
  //   focusOffset: 0,
  //   isBackward: false,
  //   hasFocus: true
  // });
  // const contentState = Draft.convertFromRaw(beforeRawContentState);
  // const editorState = EditorState.forceSelection(
  //   EditorState.createWithContent(contentState),
  //   selection
  // );
  it('correct', () => {
    const findEntityRanges = createFindEntitiesBy('EXAMPLE');
    const block = new ContentBlock({ text: ' ', characterList: List([new CharacterMetadata()]) });
    const callback = sinon.spy();
    expect(findEntityRanges).to.be.a('function');
    findEntityRanges(block, callback);
    expect(callback.calledOnce).to.be.false();
  });
});

import { expect } from 'chai';
import proxyquire from 'proxyquire';
import Draft, { EditorState } from 'draft-js';

describe('insertFilePlaceholders', () => {
  const id = 1744835603;

  const modifier = proxyquire('../insertFilePlaceholders', {
    crypto: {
      randomBytes: () => ({
        toString: () => id,
      }),
    },
  });

  const insertFilePlaceholders = modifier.default;

  const filePlaceholders = [{
    file: {
      name: 'test1.png',
      size: 12345,
      type: 'image/png',
    },
    isImage: true,
  },
  {
    file: {
      name: 'test2.png',
      size: 443,
      type: 'image/png',
    },
    isImage: true,
  }];

  const afterEntityMap = filePlaceholders.reduce((result, filePlaceholder, index) => ({
    ...result,
    [index]: {
      data: {
        id,
        contentType: 'image/png',
        file: filePlaceholder.file,
        name: filePlaceholder.file.name,
        size: filePlaceholder.file.size,
        isImage: true,
      },
      mutability: 'IMMUTABLE',
      type: 'FILE_PLACEHOLDER',
    },
  }), {});

  it('insert', () => {
    const newEditorState = insertFilePlaceholders(EditorState.createEmpty(), filePlaceholders);
    const expected = Draft.convertToRaw(newEditorState.getCurrentContent());
    expect(expected.entityMap).to.deep.equal(afterEntityMap);
  });
});

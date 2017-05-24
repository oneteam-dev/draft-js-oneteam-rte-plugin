import { convertToRaw, Entity } from 'draft-js';
import { expect } from 'chai';

import convertToContent from '..';

describe('convertToContent', () => {
  it('multiple br', () => {
    const content = convertToRaw(
      convertToContent('<div>Text<br/><br/></div>')
    );

    expect(content.entityMap).to.deep.equal({});
    expect(content.blocks.length).to.equal(1);
    expect(content.blocks[0].data).to.deep.equal({});
    expect(content.blocks[0].depth).to.equal(0);
    expect(content.blocks[0].entityRanges).to.deep.equal([]);
    expect(content.blocks[0].inlineStyleRanges).to.deep.equal([]);
    expect(content.blocks[0].key).to.be.a('string');
    expect(content.blocks[0].text).to.equal('Text\n');
    expect(content.blocks[0].type).to.equal('unstyled');
  });
  it('nested blocks', () => {
    const content = convertToRaw(
      convertToContent('<div><div>div1</div><div>div2</div></div>')
    );

    expect(content.entityMap).to.deep.equal({});
    expect(content.blocks.length).to.equal(1);
    expect(content.blocks[0].data).to.deep.equal({});
    expect(content.blocks[0].depth).to.equal(0);
    expect(content.blocks[0].entityRanges).to.deep.equal([]);
    expect(content.blocks[0].inlineStyleRanges).to.deep.equal([]);
    expect(content.blocks[0].key).to.be.a('string');
    expect(content.blocks[0].text).to.equal('div1\ndiv2');
    expect(content.blocks[0].type).to.equal('unstyled');
  });
  it('no block tags', () => {
    const content = convertToRaw(
      convertToContent('Text')
    );

    expect(content.entityMap).to.deep.equal({});
    expect(content.blocks.length).to.equal(1);
    expect(content.blocks[0].data).to.deep.equal({});
    expect(content.blocks[0].depth).to.equal(0);
    expect(content.blocks[0].entityRanges).to.deep.equal([]);
    expect(content.blocks[0].inlineStyleRanges).to.deep.equal([]);
    expect(content.blocks[0].key).to.be.a('string');
    expect(content.blocks[0].text).to.equal('Text');
    expect(content.blocks[0].type).to.equal('unstyled');
  });
  it('no block tag', () => {
    const content = convertToRaw(
      convertToContent('Text1<div>Text2</div>')
    );

    expect(content.entityMap).to.deep.equal({});
    expect(content.blocks.length).to.equal(2);

    ['Text1', 'Text2'].forEach((text, i) => {
      expect(content.blocks[i].data).to.deep.equal({});
      expect(content.blocks[i].depth).to.equal(0);
      expect(content.blocks[i].entityRanges).to.deep.equal([]);
      expect(content.blocks[i].inlineStyleRanges).to.deep.equal([]);
      expect(content.blocks[i].key).to.be.a('string');
      expect(content.blocks[i].text).to.equal(text);
      expect(content.blocks[i].type).to.equal('unstyled');
    });
  });
  it('null', () => {
    const actual = convertToContent('');
    expect(actual).to.equal(null);
  });
  it('with `textToEntity` option', () => {
    const createHashtagEntity = (text) => {
      const ret = [];
      const mentionRegex = /#(\w+)/g;
      let result;
      while ((result = mentionRegex.exec(text))) { // eslint-disable-line no-cond-assign
        const [match, name] = result;
        const { index: offset } = result;
        const entityKey = Entity.__create('HASHTAG', 'IMMUTABLE', {
          name
        });
        ret.push({
          entity: entityKey,
          offset,
          length: match.length
        });
      }
      return ret;
    };

    const content = convertToRaw(
      convertToContent('<div>[#hashtag0,#hashtag10,] text [#hashtag2,]</div>', undefined, {
        textToEntity: (text) => createHashtagEntity(text)
      })
    );

    expect(content.entityMap).to.deep.equal({
      0: {
        data: { name: 'hashtag0' },
        mutability: 'IMMUTABLE',
        type: 'HASHTAG'
      },
      1: {
        data: { name: 'hashtag10' },
        mutability: 'IMMUTABLE',
        type: 'HASHTAG'
      },
      2: {
        data: { name: 'hashtag2' },
        mutability: 'IMMUTABLE',
        type: 'HASHTAG'
      },
    });
    expect(content.blocks.length).to.equal(1);
    expect(content.blocks[0].data).to.deep.equal({});
    expect(content.blocks[0].depth).to.equal(0);
    expect(content.blocks[0].entityRanges).to.deep.equal([
      { offset: 1, length: 9, key: 0 },
      { offset: 11, length: 10, key: 1 },
      { offset: 30, length: 9, key: 2 },
    ]);
    expect(content.blocks[0].inlineStyleRanges).to.deep.equal([]);
    expect(content.blocks[0].key).to.be.a('string');
    expect(content.blocks[0].text).to.equal('[#hashtag0,#hashtag10,] text [#hashtag2,]');
    expect(content.blocks[0].type).to.equal('unstyled');
  });
});

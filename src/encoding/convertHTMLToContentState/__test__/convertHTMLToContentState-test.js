import { convertToRaw } from 'draft-js';
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
});

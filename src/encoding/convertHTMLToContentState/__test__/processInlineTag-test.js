import { expect } from 'chai';
import { OrderedSet } from 'immutable';
import processInlineTag from '../processInlineTag';

// TODO: more tests
describe('processInlineTag', () => {
  it('inline styles font-weight: bold', () => {
    const el = document.createElement('span');
    el.style.fontWeight = 'bold';
    const actual = processInlineTag('span', el, OrderedSet());
    expect(actual).to.be.instanceof(OrderedSet);
    expect(actual.size).to.equal(1);
    expect(actual.includes('BOLD')).to.true();
  });
  it('inline styles font-style: italic', () => {
    const el = document.createElement('span');
    el.style.fontStyle = 'italic';
    const actual = processInlineTag('span', el, OrderedSet());
    expect(actual).to.be.instanceof(OrderedSet);
    expect(actual.size).to.equal(1);
    expect(actual.includes('ITALIC')).to.true();
  });
  it('inline styles text-decoration: underline', () => {
    const el = document.createElement('span');
    el.style.textDecoration = 'underline';
    const actual = processInlineTag('span', el, OrderedSet());
    expect(actual).to.be.instanceof(OrderedSet);
    expect(actual.size).to.equal(1);
    expect(actual.includes('UNDERLINE')).to.true();
  });
  it('inline styles text-decoration: line-through', () => {
    const el = document.createElement('span');
    el.style.textDecoration = 'line-through';
    const actual = processInlineTag('span', el, OrderedSet());
    expect(actual).to.be.instanceof(OrderedSet);
    expect(actual.size).to.equal(1);
    expect(actual.includes('STRIKETHROUGH')).to.true();
  });
  it('inline styles color: rgb(0, 0, 0)', () => {
    const el = document.createElement('span');
    el.style.color = 'rgb(0, 0, 0)';
    const actual = processInlineTag('span', el, OrderedSet());
    expect(actual).to.be.instanceof(OrderedSet);
    expect(actual.size).to.equal(1);
    expect(actual.includes('COLOR0')).to.true();
  });
  it('inline styles background-color: rgb(230, 0, 0)', () => {
    const el = document.createElement('span');
    el.style.backgroundColor = 'rgb(230, 0, 0)';
    const actual = processInlineTag('span', el, OrderedSet());
    expect(actual).to.be.instanceof(OrderedSet);
    expect(actual.size).to.equal(1);
    expect(actual.includes('BACKGROUND_COLOR1')).to.true();
  });
});

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { extractIFrameNode, attributesToObject, cssToObject, stringifyAttributes } from '../dom';

chai.use(sinonChai);

describe('dom helper', () => {
  describe('extractIFrameNode', () => {
    it('correct', () => {
      const html = '<div><iframe src="https://one-team.com"></iframe></div>';
      const iframe = extractIFrameNode(html);
      expect(iframe.nodeName).to.equal('IFRAME');
    });
  });
  describe('attributesToObject', () => {
    it('correct', () => {
      const html = '<div><iframe src="https://one-team.com"></iframe></div>';
      const iframe = extractIFrameNode(html);
      const ret = attributesToObject(iframe);
      expect(ret).to.deep.equal({ src: 'https://one-team.com' });
    });
  });
  describe('cssToObject', () => {
    it('correct', () => {
      const css = 'width: 10px; height:30px;color: red;border-radius: 5px';
      const ret = cssToObject(css);
      expect(ret).to.deep.equal({
        width: '10px',
        height: '30px',
        color: 'red',
        borderRadius: '5px'
      });
    });
  });
  describe('stringifyAttributes', () => {
    it('empty', () => {
      const actual = stringifyAttributes();
      expect(actual).to.equal('');
    });
    it('correct', () => {
      const actual = stringifyAttributes({
        allowFullScreen: true,
        frameBorder: '0',
        src: 'https://one-team.com',
        target: '_blank',
        other: null,
        acceptCharset: 'utf-8'
      });
      expect(actual).to.equal(' allowfullscreen frameborder="0" src="https://one-team.com" target="_blank" accept-charset="utf-8"');
    });
  });
});

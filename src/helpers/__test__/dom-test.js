import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { extractIFrameNode, attributesToObject, cssToObject } from '../dom';

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
});

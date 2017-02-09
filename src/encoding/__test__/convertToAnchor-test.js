import { expect } from 'chai';
import getSafeBodyFromHTML from 'draft-js/lib/getSafeBodyFromHTML';
import pretty from 'pretty';

import convertToAnchor from '../convertToAnchor';

describe('convertToAnchor', () => {
  let attrMap;
  let subject;
  let safeBody;
  let node;
  beforeEach(() => {
    safeBody = getSafeBodyFromHTML('<foo bar="1" baz="2"><span>span</span><a href="#test" qux="3">test</a></foo>');
    node = safeBody.firstChild;
    attrMap = {};
    subject = () => pretty(convertToAnchor(node, 'foo', attrMap).outerHTML);
  });
  it('converts to anchor attributes including anchor attributes', () => {
    attrMap = {
      myBar: 'bar',
      myBaz: 'baz',
      myQux: 'qux',
      anchor: {
        anchorQux: 'qux'
      }
    };
    expect(subject()).to.equal('<foo><span>span</span> \n  <a href="#test" target="foo:{&quot;myBar&quot;:&quot;1&quot;,&quot;myBaz&quot;:&quot;2&quot;,&quot;myQux&quot;:null,&quot;anchorQux&quot;:&quot;3&quot;}">.</a> \n</foo>');
  });
  it('converts to anchor attributes', () => {
    attrMap = {
      myBar: 'bar',
      myBaz: 'baz',
      myQux: 'qux'
    };
    expect(subject()).to.equal('<foo><span>span</span> \n  <a href="#test" qux="3" target="foo:{&quot;myBar&quot;:&quot;1&quot;,&quot;myBaz&quot;:&quot;2&quot;,&quot;myQux&quot;:null}">.</a> \n</foo>');
  });
  it('not converts', () => {
    const body = getSafeBodyFromHTML('<foo bar="1" baz="2"><span>span</span></foo>');
    expect(pretty(convertToAnchor(body.firstChild, 'foo', {}).outerHTML)).to.equal(
      '<foo bar="1" baz="2"><span>span</span> </foo>'
    );
  });
});

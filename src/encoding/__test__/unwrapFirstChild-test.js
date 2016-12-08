import getSafeBodyFromHTML from 'draft-js/lib/getSafeBodyFromHTML';
import { expect } from 'chai';
import pretty from 'pretty';
import unwrapFirstChild from '../unwrapFirstChild';

describe('unwrapFirstChild', () => {
  let html;
  let subject;
  let safeBody;
  beforeEach(() => {
    subject = () => {
      safeBody = getSafeBodyFromHTML(html);
      return pretty(unwrapFirstChild(safeBody.firstChild, 'div').outerHTML);
    };
  });
  it('unwraps children', () => {
    html = `<figure>
  <figure><div><div>depth3</div></div></figure>
  <div>depth0</div>
  <div><div>depth1</div></div>
  <div><div><div>depth2</div></div></div>
</figure>`;
    expect(subject()).to.equal('<div>depth0</div>');
  });
  it('does not unwrap children', () => {
    html = `<figure>
  <figure>
    <div>
      <div>depth3</div>
    </div>
  </figure>
</figure>`;
    expect(subject()).to.equal(html);
  });
});

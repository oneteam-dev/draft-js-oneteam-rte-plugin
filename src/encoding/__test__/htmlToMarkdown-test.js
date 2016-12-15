import { expect } from 'chai';
import htmlToMarkdown from '../htmlToMarkdown';

describe('htmlToMarkdown', () => {
  let html;
  let subject;
  beforeEach(() => {
    html = null;
    subject = () => htmlToMarkdown(html);
  });
  it('checkbox', () => {
    html = `<ul>
  <li class="task-list-item">
    <input type="checkbox" disabled /><span>CL</span>
  </li>
  <li class="task-list-item">
    <input type="checkbox" disabled /><span>CL</span>
    <ul>
      <li class="task-list-item">
        <input type="checkbox" checked disabled /><span>CL</span>
      </li>
      <li class="task-list-item">
        <input type="checkbox" disabled /><span><strong>CL mix</strong></span>
      </li>
    </ul>
  </li>
</ul>`;
    expect(subject()).to.equal(`*   [ ] CL
*   [ ] CL
    *   [x] CL
    *   [ ] **CL mix**`);
  });
  it('line break', () => {
    html = '<div>Text1</div>\n<div><br /></div><div>Text2</div>';
    expect(subject()).to.equal('Text1\n\n<br />\n\nText2');
  });
  it('default line break', () => {
    html = '<div>Text1<br />Text2</div>';
    expect(subject()).to.equal('Text1Text2');
  });
  it('div', () => {
    html = '<div>div</div>';
    expect(subject()).to.equal('div');
  });
  it('p', () => {
    html = '<p>p</p>';
    expect(subject()).to.equal('p');
  });
  it('pre single line', () => {
    html = '<pre>const f = a => a</pre>';
    expect(subject()).to.equal('```\nconst f = a => a\n```');
  });
  it('pre multi line', () => {
    html = `<pre>import fs from 'fs';
import path from 'path';</pre>`;
    expect(subject()).to.equal('```\nimport fs from \'fs\';\nimport path from \'path\';\n```');
  });
});

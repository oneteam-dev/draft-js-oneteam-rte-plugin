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
      <li>Normal list</li>
    </ul>
    <li>Normal list</li>
  </li>
</ul>`;
    expect(subject()).to.equal(`- [ ] CL
- [ ] CL
  - [x] CL
  - [ ] **CL mix**
  - Normal list
- Normal list`);
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
  it('blockquote multi line', () => {
    html = '<blockquote>line 1<br />line 2<br />line 3</blockquote>';
    expect(subject()).to.equal('> line 1\n> line 2\n> line 3');
  });
  it('blockquote single line', () => {
    html = '<blockquote>line 1</blockquote>';
    expect(subject()).to.equal('> line 1');
  });
  it('continuous 2 blockquote blocks', () => {
    html = '<blockquote>blockquote 1</blockquote><blockquote>blockquote 2</blockquote>';
    expect(subject()).to.equal('> blockquote 1\n> blockquote 2');
  });
  it('blockquote blocks contains div', () => {
    html = '<blockquote><div>blockquote 1<br />blockquote 2</div></blockquote>';
    expect(subject()).to.equal('> blockquote 1\n> blockquote 2');
  });
});

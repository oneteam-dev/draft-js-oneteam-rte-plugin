import { expect } from 'chai';
import pretty from 'pretty';
import markdownToHTML from '../markdownToHTML';

describe('markdownToHTML', () => {
  let markdown;
  let subject;
  beforeEach(() => {
    markdown = null;
    subject = () => pretty(markdownToHTML(markdown));
  });
  it('checkbox list', () => {
    markdown =
`- [ ] list0
- [x] list1
  - [ ] list3`;
    expect(subject()).to.equal(`<ul>
  <li class="task-list-item">
    <input type="checkbox" disabled/> list0</li>
  <li class="task-list-item">
    <input type="checkbox" checked/> list1
    <ul>
      <li class="task-list-item">
        <input type="checkbox" disabled/> list3</li>
    </ul>
  </li>
</ul>`);
  });
  it('pre', () => {
    markdown = '```\ncode\n```';
    expect(subject()).to.equal('<pre>code</pre>');
  });
  it('ul', () => {
    markdown = '- UL\n- Ul';
    expect(subject()).to.equal(`<ul>
  <li>UL</li>
  <li>Ul</li>
</ul>`);
  });
  it('smartLists', () => {
    markdown = '- UL\n- Ul\n\n1. OL\n2. OL';
    expect(subject()).to.equal(`<ul>
  <li>UL</li>
  <li>Ul</li>
</ul>
<ol>
  <li>OL</li>
  <li>OL</li>
</ol>`);
  });
  it('escape in code block', () => {
    markdown = '```\n<div>aaa</div>\nconst f = a => a\n```';
    expect(subject()).to.equal(`<pre>&lt;div&gt;aaa&lt;/div&gt;
const f = a =&gt; a</pre>`
    );
  });
  it('blockquote multi line', () => {
    markdown = '> line 1\n> line 2\n> line 3';
    expect(subject()).to.equal(`<blockquote>
  <div>line 1
    <br/>line 2
    <br/>line 3</div>
</blockquote>`
    );
  });
  it('blockquote single line', () => {
    markdown = '> line 1';
    expect(subject()).to.equal(`<blockquote>
  <div>line 1</div>
</blockquote>`
    );
  });
  it('blockquote contains header', () => {
    markdown = '> # header 1';
    expect(subject()).to.equal(`<blockquote>
  <h1 id="header-1">header 1</h1>
</blockquote>`
    );
  });
});

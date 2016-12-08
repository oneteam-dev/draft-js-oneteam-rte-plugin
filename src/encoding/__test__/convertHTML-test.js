import { expect } from 'chai';
import pretty from 'pretty';

import convertHTML from '../convertHTML';

describe('convertHTML', () => {
  let html;
  let subject;
  beforeEach(() => {
    html = null;
    subject = () => pretty(convertHTML(html));
  });
  it('no doc', () => {
    expect(subject()).to.equal('');
  });
  it('no anchor', () => {
    html = `<figure>
  <pdf-preview
    src="https://foo.bar.baz/preview"
    original-file-url="https://foo.bar.baz/preview"
    original-file-name="qux.docx"
    original-file-content-type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    width="612" height="792">
  </pdf-preview>
</figure>`;
    expect(subject()).to.equal(`<pdf-preview>
</pdf-preview>`);
  });
  it('converts html', () => {
    html = `<figure>
  <pdf-preview
    src="https://foo.bar.baz/preview"
    original-file-url="https://foo.bar.baz/preview"
    original-file-name="qux.docx"
    original-file-content-type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    width="612" height="792">
    <a href="https://foo.bar.baz/download" data-name="qux.docx" data-size="244897" target="_blank" download>test1.docx</a>
  </pdf-preview>
</figure>`;
    expect(subject()).to.equal(`<pdf-preview>
  <a href="https://foo.bar.baz/download" data-name="qux.docx" target="pdf-preview:{&quot;previewURL&quot;:&quot;https://foo.bar.baz/preview&quot;,&quot;orignalFileURL&quot;:&quot;https://foo.bar.baz/preview&quot;,&quot;orignalFileName&quot;:&quot;qux.docx&quot;,&quot;orignalFileContentType&quot;:&quot;application/vnd.openxmlformats-officedocument.wordprocessingml.document&quot;,&quot;width&quot;:&quot;612&quot;,&quot;height&quot;:&quot;792&quot;,&quot;size&quot;:&quot;244897&quot;}"
  download="">.</a> 
</pdf-preview>`);
  });
});

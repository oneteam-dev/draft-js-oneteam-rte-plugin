import Draft, { convertToRaw, convertFromHTML, ContentState, DefaultDraftBlockRenderMap } from 'draft-js';
import { expect } from 'chai';
import sinon from 'sinon';

import createOneteamRTEPlugin from '../';

// Draft.ContentState.createFromBlockArray(Draft.convertFromHTML('<pdf-preview />'))

describe('convertFromHTML', () => {
  let html;
  let config;
  let plugin;
  let subject;
  let blockArray;
  let contentState;
  before(() => {
    sinon.stub(Draft, 'genKey').returns('item2');
  });
  after(() => {
    Draft.genKey.restore();
  });
  beforeEach(() => {
    html = `<pdf-preview>
  <a href="https://foo.bar.baz/download" data-name="qux.docx" target="pdf-preview:{&quot;previewURL&quot;:&quot;https://foo.bar.baz/preview&quot;,&quot;orignalFileURL&quot;:&quot;https://foo.bar.baz/preview&quot;,&quot;orignalFileName&quot;:&quot;qux.docx&quot;,&quot;orignalFileContentType&quot;:&quot;application/vnd.openxmlformats-officedocument.wordprocessingml.document&quot;,&quot;width&quot;:&quot;612&quot;,&quot;height&quot;:&quot;792&quot;}" download="">test1.docx</a>
</pdf-preview>`;
    config = {};
    subject = () => {
      plugin = createOneteamRTEPlugin(config);
      blockArray = convertFromHTML(html, undefined, DefaultDraftBlockRenderMap.merge(plugin.blockRenderMap));
      contentState = ContentState.createFromBlockArray(blockArray);
      return convertToRaw(contentState);
    };
  });
  it('converts html', () => {
    const rawContent = subject();
    rawContent.blocks[0].key = 'test';
    expect(rawContent).to.deep.equal({
      blocks: [
        {
          data: {},
          depth: 0,
          entityRanges: [
            {
              key: 0,
              length: 10,
              offset: 0
            }
          ],
          inlineStyleRanges: [],
          key: 'test',
          text: 'test1.docx ',
          type: 'pdf-preview'
        }
      ],
      entityMap: {
        0: {
          data: {
            href: 'https://foo.bar.baz/download',
            target: 'pdf-preview:{"previewURL":"https://foo.bar.baz/preview","orignalFileURL":"https://foo.bar.baz/preview","orignalFileName":"qux.docx","orignalFileContentType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","width":"612","height":"792"}',
            url: 'https://foo.bar.baz/download'
          },
          mutability: 'MUTABLE',
          type: 'LINK'
        }
      }
    });
  });
});

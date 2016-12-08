import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Draft from 'draft-js';
import createPDFPreviewStrategy from '../pdfPreviewStrategy';

chai.use(sinonChai);

describe('pdfPreviewStrategy', () => {
  const contentState = Draft.convertFromRaw({
    entityMap: {
      0: {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          href: 'http://cultofthepartyparrot.com/',
          title: 'parrot',
          target: 'pdf-preview:{"previewURL":"https://foo.bar.baz/preview","orignalFileURL":"https://foo.bar.baz/preview","orignalFileName":"qux.docx","orignalFileContentType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","width":"612","height":"792","size":"244897"}'
        }
      }
    },
    blocks: [
      {
        key: 'dtehj',
        text: 'parrot click me',
        type: 'pdf-preview',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 7,
            length: 5,
            key: 0
          }
        ],
        data: {}
      }
    ]
  });
  it('callbacks range', () => {
    const block = contentState.getBlockForKey('dtehj');
    const strategy = createPDFPreviewStrategy();
    const cb = sinon.spy();
    expect(block).to.be.an('object');
    strategy(block, cb);
    expect(cb).to.have.been.calledWith(7, 12);
  });
});

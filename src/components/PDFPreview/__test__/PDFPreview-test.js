import React from 'react';
import { ContentState } from 'draft-js';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import pretty from 'pretty';

import PDFPreview from '../';

chai.use(chaiEnzyme());

describe('<PDFPreview />', () => {
  it('renders anchor tag', () => {
    const contentState = ContentState.createFromText('').createEntity('LINK', 'MUTABLE', {
      href: 'http://cultofthepartyparrot.com/',
      title: 'parrot',
      target: 'pdf-preview:{"previewURL":"https://foo.bar.baz/preview","orignalFileURL":"https://foo.bar.baz/preview","orignalFileName":"qux.docx","orignalFileContentType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","width":"612","height":"792","size":"244897"}'
    });
    const entityKey = contentState.getLastCreatedEntityKey();
    expect(
      pretty(shallow(<PDFPreview entityKey={entityKey} contentState={contentState}>test</PDFPreview>).html())
    ).to.equal(
      `<div>
  <dl contenteditable="false">
    <dt>previewURL</dt>
    <dd>https://foo.bar.baz/preview</dd>
    <dt>orignalFileURL</dt>
    <dd>https://foo.bar.baz/preview</dd>
    <dt>orignalFileName</dt>
    <dd>qux.docx</dd>
    <dt>orignalFileContentType</dt>
    <dd>application/vnd.openxmlformats-officedocument.wordprocessingml.document</dd>
    <dt>width</dt>
    <dd>612</dd>
    <dt>height</dt>
    <dd>792</dd>
    <dt>size</dt>
    <dd>244897</dd>
  </dl><span style="opacity:0;">test</span></div>`
    );
  });
});

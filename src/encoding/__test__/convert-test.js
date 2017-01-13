import { expect } from 'chai';
import { EditorState } from 'draft-js';
import almostAll from './fixtures/all-html';
import { pdfPreview00, pdfPreview01 } from './fixtures/pdf-preview-html';
import { list } from './fixtures/list-html';
import { pre } from './fixtures/pre-html';
import { filePlaceholder00, filePlaceholder01, filePlaceholder02 } from './fixtures/file-placeholder-html';

import convertToContent from '../convertHTMLToContentState';
import convertToHTML from '../convertContentStateToHTML';

describe('Interconvert', () => {
  const convertToHTMLOptions = {
    blockRenderers: {
      'code-block': (block) => {
        const lang = block.getData().get('language');
        const text = block.getText();
        return `<pre${lang ? ` data-language="${lang}"` : ''}>${text}</pre>`;
      }
    }
  };

  it('All', () => {
    const content = convertToContent(almostAll);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent(), convertToHTMLOptions);
    expect(actual).to.equal(almostAll);
  });

  it('pdf-preview `application/pdf`', () => {
    const content = convertToContent(pdfPreview00);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent(), convertToHTMLOptions);
    expect(actual).to.equal(pdfPreview00);
  });

  it('pdf-preview office file', () => {
    const content = convertToContent(pdfPreview01);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent(), convertToHTMLOptions);
    expect(actual).to.equal(pdfPreview01);
  });

  it('file-placeholder .zip', () => {
    const content = convertToContent(filePlaceholder00);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent(), convertToHTMLOptions);
    expect(actual).to.equal(filePlaceholder00);
  });

  it('file-placeholder .pdf', () => {
    const content = convertToContent(filePlaceholder01);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent(), convertToHTMLOptions);
    expect(actual).to.equal(filePlaceholder01);
  });

  it('file-placeholder .xlsx', () => {
    const content = convertToContent(filePlaceholder02);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent(), convertToHTMLOptions);
    expect(actual).to.equal(filePlaceholder02);
  });

  it('List', () => {
    const content = convertToContent(list);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent(), convertToHTMLOptions);
    expect(actual).to.equal(list);
  });

  it('pre', () => {
    const content = convertToContent(pre);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal('<pre>const f = x =&gt; x;</pre>');
  });
});

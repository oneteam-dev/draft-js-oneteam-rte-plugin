import { expect } from 'chai';
import { EditorState, Entity } from 'draft-js';
import almostAll from './fixtures/all-html';
import { pdfPreview00, pdfPreview01 } from './fixtures/pdf-preview-html';
import { list } from './fixtures/list-html';
import { pre } from './fixtures/pre-html';
import { code } from './fixtures/code-block-html';
import { mention } from './fixtures/mention-html';
import { filePlaceholder00, filePlaceholder01, filePlaceholder02 } from './fixtures/file-placeholder-html';

import convertToContent from '../convertHTMLToContentState';
import convertToHTML from '../convertContentStateToHTML';

describe('Interconvert', () => {
  it('All', () => {
    const content = convertToContent(almostAll);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal(almostAll);
  });

  it('pdf-preview `application/pdf`', () => {
    const content = convertToContent(pdfPreview00);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal(pdfPreview00);
  });

  it('pdf-preview office file', () => {
    const content = convertToContent(pdfPreview01);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal(pdfPreview01);
  });

  it('file-placeholder .zip', () => {
    const content = convertToContent(filePlaceholder00);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal(filePlaceholder00);
  });

  it('file-placeholder .pdf', () => {
    const content = convertToContent(filePlaceholder01);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal(filePlaceholder01);
  });

  it('file-placeholder .xlsx', () => {
    const content = convertToContent(filePlaceholder02);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal(filePlaceholder02);
  });

  it('List', () => {
    const content = convertToContent(list);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal(list);
  });

  it('pre', () => {
    const content = convertToContent(pre);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal('<pre>const f = x =&gt; x;</pre>');
  });

  it('Code block', () => {
    const content = convertToContent(code);
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent());
    expect(actual).to.equal(
      '<pre data-language="ruby">def func()\n  &quot;Hello&quot;\nend</pre><pre data-language="html">&lt;div&gt;text&lt;/div&gt;</pre>'
    );
  });

  it('Mention', () => {
    const content = convertToContent(mention, void 0, {
      textToEntity(text) {
        const ret = [];
        const mentionRegex = /\@([a-z][0-9a-z-_]+)/g;
        let result;
        const mentions = [{ name: 'Shingo Sato', userName: 'sugarshin' }, { name: 'Atsushi Nagase', userName: 'ngs' }];
        while((result = mentionRegex.exec(text))) {
          const [match, userName] = result;
          const { index: offset } = result;
          const mention = mentions.find((m) => m.userName === userName);
          const entityKey = Entity.__create('mention', 'IMMUTABLE', { mention });
          ret.push({
            entity: entityKey,
            offset,
            length: match.length,
            result: mention.name
          });
        }
        return ret;
      }
    });
    const editorState = EditorState.createWithContent(content);
    const actual = convertToHTML(editorState.getCurrentContent(), {
      entityRenderers: {
        mention: (entity) => `@${entity.getData().mention.userName}`
      }
    });
    expect(actual).to.equal(
      mention
    );
  });
});

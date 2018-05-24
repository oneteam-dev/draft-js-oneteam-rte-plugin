import marked from 'marked';
import htmlclean from 'htmlclean';
import he from 'he';

const renderer = new marked.Renderer();

renderer.listitem = (text) => {
  if (/<input[^>]+type="checkbox"/.test(text)) {
    return `<li class="task-list-item">${text}</li>\n`;
  }
  return `<li>${text}</li>\n`;
};

renderer.code = (code, language) => {
  const escapedCode = he.escape(code);
  return `<pre${language ? ` data-language="${language}"` : ''}>${escapedCode}</pre>\n`;
};

renderer.paragraph = (text) => `<div>${text}</div>\n`;

renderer.blockquote = (text) => {
  return `<blockquote>${text.replace(/\n$/, '').split('\n').join('<br />')}</blockquote>\n`;
};

marked.setOptions({
  gfm: true,
  smartLists: true,
  xhtml: true,
  renderer
});

const markdownToHTML = (markdown) => htmlclean(marked(markdown));

export default markdownToHTML;

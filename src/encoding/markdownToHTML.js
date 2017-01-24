import marked from 'marked';
import htmlclean from 'htmlclean';
import he from 'he';

const renderer = new marked.Renderer();

renderer.listitem = (text) => {
  /* eslint-disable no-useless-escape */
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text // eslint-disable-line no-param-reassign
      .replace(/^\s*\[ \]\s*/, '<input type="checkbox" /> ')
      .replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked /> ');
    return `<li class="task-list-item">${text}</li>\n`;
  }
  /* eslint-enable no-useless-escape */
  return `<li>${text}</li>\n`;
};

renderer.code = (code, language) => {
  const escapedCode = he.escape(code);
  return `<pre${language ? ` data-language="${language}"` : ''}>${escapedCode}</pre>`;
};

renderer.paragraph = (text) => `<div>${text}</div>\n`;

marked.setOptions({
  gfm: true,
  smartLists: true,
  renderer
});

const markdownToHTML = (markdown) => htmlclean(marked(markdown));

export default markdownToHTML;

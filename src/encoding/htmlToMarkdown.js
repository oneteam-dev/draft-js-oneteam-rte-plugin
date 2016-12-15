import toMarkdown from 'to-markdown';

const toMarkdownOptions = {
  converters: [
    {
      filter: ['div', 'figure', 'p'],
      replacement: (content) => `\n\n${content}\n\n`
    },
    {
      filter: 'br',
      replacement: (content, node) => {
        // Blank line
        const { parentNode } = node;
        if (
          (parentNode.nodeName === 'DIV' || parentNode.nodeName === 'P') &&
          !!parentNode.nextElementSibling &&
          parentNode.children.length === 1
        ) {
          return '<br />';
        }
        return '';
      }
    },
    {
      filter: 'pre',
      replacement: (content, node) => {
        const language = node.getAttribute('data-language');
        return `\`\`\`${language || ''}\n${content}\n\`\`\`\n\n`;
      }
    },
    {
      filter: (node) => {
        const firstSiblingNode = node.parentNode.firstChild;
        return firstSiblingNode.nodeName === 'INPUT' &&
          firstSiblingNode.type === 'checkbox' &&
          node.nodeName === 'SPAN';
      },
      replacement: (content) => content
    }
  ],
  gfm: true
};

const htmlToMarkdown = (html) => (
  toMarkdown(
    html,
    toMarkdownOptions
  )
);

export default htmlToMarkdown;

import toMarkdown from 'to-markdown';

const isInNode = (nodeName, node, maxDepth = 2) => {
  if (maxDepth <= 0) {
    return false;
  }
  if (node.parentNode.nodeName === nodeName) {
    return true;
  }
  return isInNode(nodeName, node.parentNode, maxDepth - 1);
};

const toMarkdownOptions = {
  converters: [
    {
      filter: ['div', 'figure', 'p'],
      replacement: (content, node) => {
        // strip line-break if in <blockquote />
        if (node.parentNode.nodeName === 'BLOCKQUOTE') {
          return content;
        }
        return `\n\n${content}\n\n`;
      }
    },
    {
      filter: 'br',
      replacement: (content, node) => {
        const { parentNode } = node;
        if (
          isInNode('BLOCKQUOTE', node) ||
          // Blank line
          (
            (parentNode.nodeName === 'DIV' || parentNode.nodeName === 'P') &&
            !!parentNode.nextElementSibling &&
            parentNode.children.length === 1
          )
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
    // checkbox list
    {
      filter: (node) => {
        const firstSiblingNode = node.parentNode.firstChild;
        return firstSiblingNode.nodeName === 'INPUT' &&
          firstSiblingNode.type === 'checkbox' &&
          node.nodeName === 'SPAN';
      },
      replacement: (content) => content
    },
    // Trim extra space and change to 2 space indent for list
    // issue: https://github.com/domchristie/to-markdown/issues/161
    // will monkey patching because not customizable
    // ref: https://github.com/domchristie/to-markdown/blob/1fde68fd7cde63676bda85f8580b6be52a0b0a20/lib/md-converters.js#L105
    {
      filter: 'li',
      replacement: (content, node) => {
        const parent = node.parentNode;
        const index = Array.prototype.indexOf.call(parent.children, node) + 1;
        const prefix = /ol/i.test(parent.nodeName) ? `${index}. ` : '- ';
        return prefix + content.replace(/^\s+/, '').replace(/\n/gm, '\n  ');
      }
    },
    {
      filter: 'blockquote',
      replacement: (content) => {
        const ret = content.split(/<br\s*\/?>/).map((str) => `\n> ${str}`).join('');
        return ret;
      }
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

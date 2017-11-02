import type { DraftInlineStyle } from 'draft-js/lib/DraftInlineStyle';

import { INLINE_STYLES, OLD_COLORS, OLD_INLINE_STYLES_SIZE, OLD_INLINE_STYLES } from '../../constants';

const inlineTags = {
  b: INLINE_STYLES.BOLD,
  code: INLINE_STYLES.CODE,
  del: INLINE_STYLES.STRIKETHROUGH,
  em: INLINE_STYLES.ITALIC,
  i: INLINE_STYLES.ITALIC,
  s: INLINE_STYLES.STRIKETHROUGH,
  strike: INLINE_STYLES.STRIKETHROUGH,
  strong: INLINE_STYLES.BOLD,
  u: 'UNDERLINE',
  ins: 'UNDERLINE'
};

const hasFontSize = (element: Element): boolean => (
  Object.keys(OLD_INLINE_STYLES_SIZE).some((label) => (
    OLD_INLINE_STYLES_SIZE[label].fontSize === parseInt(element.style.fontSize, 10)
  ))
);

const hasColor = (element: Element, prop: string): boolean => (
  OLD_COLORS.some((color) => color === element.style[prop])
);

const processInlineTag = (
  tag: string,
  node: Node,
  currentStyle: DraftInlineStyle
): DraftInlineStyle => {
  const styleToCheck = inlineTags[tag];
  if (styleToCheck) {
    currentStyle = currentStyle.add(styleToCheck).toOrderedSet(); // eslint-disable-line no-param-reassign
  } else if (node instanceof HTMLElement) {
    const htmlElement = node;
    currentStyle = currentStyle.withMutations((style) => { // eslint-disable-line no-param-reassign
      if (htmlElement.style.fontWeight === 'bold') {
        style.add(INLINE_STYLES.BOLD);
      }

      if (htmlElement.style.fontStyle === 'italic') {
        style.add(INLINE_STYLES.ITALIC);
      }

      if (htmlElement.style.textDecoration === 'underline') {
        style.add('UNDERLINE');
      }

      if (htmlElement.style.textDecoration === 'line-through') {
        style.add(INLINE_STYLES.STRIKETHROUGH);
      }

      if (hasColor(htmlElement, 'color')) {
        const styleLabel = Object.keys(OLD_INLINE_STYLES).filter((label) => (
          OLD_INLINE_STYLES[label].color === htmlElement.style.color
        ))[0];
        style.add(styleLabel);
      }

      if (hasColor(htmlElement, 'backgroundColor')) {
        const styleLabel = Object.keys(OLD_INLINE_STYLES).filter((label) => (
          OLD_INLINE_STYLES[label].backgroundColor === htmlElement.style.backgroundColor
        ))[0];
        style.add(styleLabel);
      }

      if (hasFontSize(htmlElement)) {
        const styleLabel = Object.keys(OLD_INLINE_STYLES_SIZE).filter((label) => (
          OLD_INLINE_STYLES_SIZE[label].fontSize === parseInt(htmlElement.style.fontSize, 10)
        ))[0];
        style.add(styleLabel);
      }
    }).toOrderedSet();
  }
  return currentStyle;
};

export default processInlineTag;

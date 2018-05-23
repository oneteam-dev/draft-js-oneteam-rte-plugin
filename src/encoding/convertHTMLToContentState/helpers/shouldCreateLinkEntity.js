// @flow

import invariant from 'invariant';

const hasValidLinkText = (link: Element): boolean => {
  invariant(
    link instanceof HTMLAnchorElement,
    'Link must be an HTMLAnchorElement.'
  );
  const protocol = link.protocol;
  return protocol === 'http:' || protocol === 'https:';
};

const isTextAndHrefSameValue = (element: HTMLElement): boolean => (
  element.getAttribute('href') === element.textContent
);

const shouldCreateLinkEntity = (tagName: string, element: HTMLAnchorElement): boolean => (
  tagName === 'a' && !!element.href && hasValidLinkText(element) && !isTextAndHrefSameValue(element)
);

export default shouldCreateLinkEntity;

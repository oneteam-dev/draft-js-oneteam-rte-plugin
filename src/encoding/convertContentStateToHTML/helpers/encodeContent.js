// @flow

export const BREAK = '<br/>';

const encodeContent = (text: string): string => (
  /* eslint-disable newline-per-chained-call */
  text
    .split('&').join('&amp;')
    .split('<').join('&lt;')
    .split('>').join('&gt;')
    .split('\xA0').join('&nbsp;')
    .split('\n').join(BREAK)
  /* eslint-enable newline-per-chained-call */
);

export default encodeContent;

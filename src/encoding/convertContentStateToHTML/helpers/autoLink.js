// @flow

import Autolinker from 'autolinker';

const autolinker = new Autolinker({
  email: false,
  phone: false,
  stripPrefix: false,
  stripTrailingSlash: false,
  newWindow: false,
  replaceFn: (match) => {
    const tag = match.buildTag();
    tag.setAttr('target', '_blank');
    return tag;
  }
});
const autoLink = (text: string): string => autolinker.link(text);

export default autoLink;

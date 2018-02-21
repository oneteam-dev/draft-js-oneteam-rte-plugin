import { EntityInstance } from 'draft-js';
import { ENTITY_TYPES } from '../../../constants';

type StringMap = { [key: string]: ?string };
type AttrMap = { [key: string]: StringMap };

// Map entity data to element attributes.
export const ENTITY_ATTR_MAP: AttrMap = {
  [ENTITY_TYPES.DOWNLOAD_LINK]: { url: 'href', rel: 'rel', title: 'title', className: 'class', size: 'size', name: 'name' },
  [ENTITY_TYPES.LINK]: { url: 'href', rel: 'rel', title: 'title', className: 'class', href: 'href' },
  [ENTITY_TYPES.IMAGE]: { src: 'src', height: 'height', width: 'width', alt: 'alt', className: 'class', 'data-original-url': 'href' },
  IMG: { src: 'src', height: 'height', width: 'width', alt: 'alt', className: 'class', title: 'title' },
  [ENTITY_TYPES.IFRAME]: {
    src: 'src',
    height: 'height',
    width: 'width',
    name: 'name',
    title: 'title',
    className: 'class',
    allowFullScreen: 'allowfullscreen',
    frameBorder: 'frameborder',
    sandbox: 'sandbox',
    style: 'style',
  },
  [ENTITY_TYPES.WEB_CARD]: {
    url: 'url',
    imageRemoved: 'imageremoved',
  },
};

// Map entity data to element attributes.
const dataToAttr = (entityType: string, entity: EntityInstance): StringMap => {
  const attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
  const data = entity.getData();
  const attrs = {};
  for (const dataKey of Object.keys(data)) {
    const dataValue = data[dataKey];
    if (attrMap.hasOwnProperty(dataKey)) {
      const attrKey = attrMap[dataKey];
      if (attrKey) {
        attrs[attrKey] = dataValue;
      }
    }
  }
  return attrs;
};

export default dataToAttr;

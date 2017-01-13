import { CHECKABLE_LIST_ITEM } from 'draft-js-checkable-list-item';

import type { DraftBlockType } from 'draft-js/lib/DraftBlockType';

import { BLOCK_TYPES, OLD_BLOCK_TYPES } from '../../constants';

const getBlockTypeForTag = (
  tagName: string,
  lastList: ?string,
  element: ?Element
): DraftBlockType => {
  switch (tagName) {
    case 'h1':
      return BLOCK_TYPES.H1;
    case 'h2':
      return BLOCK_TYPES.H2;
    case 'h3':
      return BLOCK_TYPES.H3;
    case 'h4':
      return BLOCK_TYPES.H4;
    case 'h5':
      return BLOCK_TYPES.H5;
    case 'h6':
      return 'header-six';
    case 'li':
      if (lastList === 'ol') {
        return BLOCK_TYPES.ORDERED_LIST_ITEM;
      }
      if (element && element.classList.contains('task-list-item')) {
        return CHECKABLE_LIST_ITEM;
      }
      return BLOCK_TYPES.UNORDERED_LIST_ITEM;
    case 'blockquote':
      return BLOCK_TYPES.BLOCKQUOTE;
    case 'pre':
      return BLOCK_TYPES.CODE_BLOCK;
    case 'div':
      if (element && element.style.textAlign === 'center') {
        return OLD_BLOCK_TYPES.ALIGN_CENTER;
      } else if (element && element.style.textAlign === 'right') {
        return OLD_BLOCK_TYPES.ALIGN_RIGHT;
      } else if (element && element.style.textAlign === 'justify') {
        return OLD_BLOCK_TYPES.ALIGN_JUSTIFY;
      }
      return BLOCK_TYPES.UNSTYLED;
    default:
      return BLOCK_TYPES.UNSTYLED;
  }
};

export default getBlockTypeForTag;

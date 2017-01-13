import { CHECKABLE_LIST_ITEM } from 'draft-js-checkable-list-item';
import { BLOCK_TYPES } from '../../../constants';

// The reason this returns an array is because a single block might get wrapped
// in two tags.

const getTag = (blockType: string): string => {
  switch (blockType) {
    case BLOCK_TYPES.H1:
      return 'h1';
    case BLOCK_TYPES.H2:
      return 'h2';
    case BLOCK_TYPES.H3:
      return 'h3';
    case BLOCK_TYPES.H4:
      return 'h4';
    case BLOCK_TYPES.H5:
      return 'h5';
    case 'header-six':
      return 'h6';
    case BLOCK_TYPES.UNORDERED_LIST_ITEM:
    case BLOCK_TYPES.ORDERED_LIST_ITEM:
    case CHECKABLE_LIST_ITEM:
      return 'li';
    case BLOCK_TYPES.BLOCKQUOTE:
      return 'blockquote';
    case BLOCK_TYPES.CODE_BLOCK:
      return 'pre';
    case BLOCK_TYPES.ATOMIC:
      return 'figure';
    default:
      return 'div';
  }
};

export default getTag;

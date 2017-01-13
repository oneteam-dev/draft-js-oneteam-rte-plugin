import { CHECKABLE_LIST_ITEM } from 'draft-js-checkable-list-item';
import { BLOCK_TYPES } from '../../../constants';

const canHaveDepth = (blockType: string): boolean => {
  switch (blockType) {
    case BLOCK_TYPES.UNORDERED_LIST_ITEM:
    case BLOCK_TYPES.ORDERED_LIST_ITEM:
    case CHECKABLE_LIST_ITEM:
      return true;
    default:
      return false;
  }
};

export default canHaveDepth;

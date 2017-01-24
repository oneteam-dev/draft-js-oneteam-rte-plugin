import { BLOCK_TYPES } from '../../../constants';

const getWrapperTag = (blockType: string): ?string => {
  switch (blockType) {
    case BLOCK_TYPES.UNORDERED_LIST_ITEM:
    case BLOCK_TYPES.CHECKABLE_LIST_ITEM:
      return 'ul';
    case BLOCK_TYPES.ORDERED_LIST_ITEM:
      return 'ol';
    default:
      return null;
  }
};

export default getWrapperTag;

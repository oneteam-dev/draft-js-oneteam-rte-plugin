// @flow

import { ContentState, ContentBlock, CharacterMetadata } from 'draft-js';

const createFindEntitiesBy = (entityType: string): Function => (
  (block: ContentBlock, callback: Function, content: ContentState): void => {
    block.findEntityRanges(
      (character: CharacterMetadata): boolean => {
        const entityKey = character.getEntity();
        return entityKey !== null && content.getEntity(entityKey).getType() === entityType;
      },
      callback
    );
  }
);

export default createFindEntitiesBy;

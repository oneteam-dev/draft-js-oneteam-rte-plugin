// @flow

import { ContentBlock, Entity, CharacterMetadata } from 'draft-js';

const createFindEntitiesBy = (entityType: string): Function => (
  (block: ContentBlock, callback: Function): void => {
    block.findEntityRanges(
      (character: CharacterMetadata): boolean => {
        const entityKey = character.getEntity();
        return entityKey !== null && Entity.get(entityKey).getType() === entityType;
      },
      callback
    );
  }
);

export default createFindEntitiesBy;

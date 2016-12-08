import { Entity } from 'draft-js';

const createPDFPreviewStrategy = () => {
  const findPDFPreviewEntities = (contentBlock, callback) => {
    if (contentBlock.getType() === 'pdf-preview') {
      contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          Entity.get(entityKey).getType() === 'LINK'
        );
      }, callback);
    }
  };
  return findPDFPreviewEntities;
};

export default createPDFPreviewStrategy;

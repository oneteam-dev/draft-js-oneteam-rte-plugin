import React from 'react';
import unionClassNames from 'union-class-names';
import { cssToObject } from '../../helpers/dom';

const IFrame = (props) => {
  const {
    contentState,
    block,
    className,
    theme = {},
    ...otherProps
  } = props;

  const {
    blockProps, // eslint-disable-line no-unused-vars
    customStyleMap, // eslint-disable-line no-unused-vars
    customStyleFn, // eslint-disable-line no-unused-vars
    decorator, // eslint-disable-line no-unused-vars
    forceSelection, // eslint-disable-line no-unused-vars
    offsetKey, // eslint-disable-line no-unused-vars
    selection, // eslint-disable-line no-unused-vars
    tree, // eslint-disable-line no-unused-vars
    blockStyleFn, // eslint-disable-line no-unused-vars
    ...elementProps
  } = otherProps;

  const combinedClassName = unionClassNames(theme.image, className);
  const attributes = contentState.getEntity(block.getEntityAt(0)).getData();

  return (
    <iframe
      {...elementProps}
      {...attributes}
      style={cssToObject(attributes.style || '')}
      className={combinedClassName}
    />
  );
};

export default IFrame;

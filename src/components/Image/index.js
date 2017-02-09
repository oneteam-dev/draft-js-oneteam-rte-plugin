import React from 'react';
import { Entity } from 'draft-js';
import unionClassNames from 'union-class-names';

const Image = (props) => {
  const {
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
    ...elementProps
  } = otherProps;

  const combinedClassName = unionClassNames(theme.image, className);
  const { src, alt, title } = Entity.get(block.getEntityAt(0)).getData();
  return (
    <img
      {...elementProps}
      src={src}
      alt={alt}
      title={title}
      role="presentation"
      className={combinedClassName}
    />
  );
};

export default Image;

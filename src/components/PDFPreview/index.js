import React from 'react';
import { Entity } from 'draft-js';

const PDFPreview = (props) => {
  const { target } = Entity.get(props.entityKey).getData();
  const fileProps = JSON.parse(target.replace(/^pdf-preview:/, ''));
  return (
    <div>
      <dl contentEditable={'false'}>
        <dt>previewURL</dt><dd>{fileProps.previewURL}</dd>
        <dt>orignalFileURL</dt><dd>{fileProps.orignalFileURL}</dd>
        <dt>orignalFileName</dt><dd>{fileProps.orignalFileName}</dd>
        <dt>orignalFileContentType</dt><dd>{fileProps.orignalFileContentType}</dd>
        <dt>width</dt><dd>{fileProps.width}</dd>
        <dt>height</dt><dd>{fileProps.height}</dd>
        <dt>size</dt><dd>{fileProps.size}</dd>
      </dl>
      <span style={{ opacity: 0 }}>{props.children}</span>
    </div>
  );
};

export default PDFPreview;

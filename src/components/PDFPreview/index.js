import React from 'react';

const PDFPreview = (props) => {
  const { target } = props.contentState.getEntity(props.entityKey).getData();
  const fileProps = JSON.parse(target.replace(/^pdf-preview:/, ''));
  return (
    <div>
      <dl contentEditable={'false'} suppressContentEditableWarning>
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

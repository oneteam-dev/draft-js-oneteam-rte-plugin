import getSafeBodyFromHTML from 'draft-js/lib/getSafeBodyFromHTML';
import unwrapFirstChild from './unwrapFirstChild';
import convertToAnchor from './convertToAnchor';

const pdfPreviewAttrMap = {
  previewURL: 'src',
  orignalFileURL: 'original-file-url',
  orignalFileName: 'original-file-name',
  orignalFileContentType: 'original-file-content-type',
  width: 'width',
  height: 'height',
  anchor: {
    size: 'data-size'
  }
};

const processDOMNode = (node) => {
  const nodeName = node.nodeName.toLowerCase();
  if (nodeName === '#text') {
    return node;
  }
  let child = node.firstChild;
  while (child) {
    processDOMNode(child);
    child = child.nextSibling;
  }
  switch (nodeName) {
    case 'figure':
      return unwrapFirstChild(node, 'pdf-preview');
    case 'pdf-preview':
      return convertToAnchor(node, 'pdf-preview', pdfPreviewAttrMap);
    // TODO: @sugarshin
    // case 'web-card':
    // case 'file-preview';
    default:
      return node;
  }
};

const convertHTML = (html) => {
  const safeBody = getSafeBodyFromHTML(html);
  if (!safeBody) {
    return '';
  }
  return processDOMNode(safeBody).innerHTML;
};

export default convertHTML;

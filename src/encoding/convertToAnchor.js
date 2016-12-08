import extend from 'extend';

const extractAttributes = (node, attrMap) => {
  const attr = {};
  Object.keys(attrMap).forEach((k) => {
    const v = attrMap[k];
    if (typeof v === 'string') {
      attr[k] = node.getAttribute(v);
      node.removeAttribute(v);
    }
  });
  return attr;
};

const convertToAnchor = (node, component, attrMap) => {
  let child = node.firstChild;
  let attr = extractAttributes(node, attrMap);
  const anchorAttrMap = attrMap.anchor || {};
  while (child) {
    if (child.nodeName.toLowerCase() === 'a') {
      attr = extend(attr, extractAttributes(child, anchorAttrMap));
      const target = `${component}:${JSON.stringify(attr)}`;
      child.setAttribute('target', target);
      child.innerHTML = '.';
      return node;
    }
    child = child.nextSibling;
  }
  return node;
};

export default convertToAnchor;

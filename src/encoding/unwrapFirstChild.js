const unwrapFirstChild = (node, childNodeName) => {
  const parent = node.parentNode;
  const children = node.childNodes;
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child.nodeName.toLowerCase() === childNodeName) {
      node.removeChild(child);
      parent.insertBefore(child, node);
      parent.removeChild(node);
      return child;
    }
  }
  return node;
};

export default unwrapFirstChild;

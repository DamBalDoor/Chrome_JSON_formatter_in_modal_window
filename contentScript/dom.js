const ELEMENT_NODE = Node.ELEMENT_NODE;
const TEXT_NODE = Node.TEXT_NODE;
function getNextNotEmptyNode(node, siblingKey = "nextSibling") {
  if (!node) return node;
  const res = getNotEmptySibling(node, siblingKey);
  if (res) return res;
  return getParentSibling(node, siblingKey);
}
function getNotEmptySibling(node, siblingKey) {
  node = node[siblingKey];
  while (node && !node.textContent.trim()) {
    // no need '  '
    node = node[siblingKey];
  }
  return node;
}
function getParentSibling(node, siblingKey) {
  node = node.parentNode;
  if (node.nodeName === "BODY") return;
  if (!node) return;
  let res = node[siblingKey];
  while (!res && node.parentNode) {
    res = node.parentNode[siblingKey];
    node = node.parentNode;
  }
  if (res && !res.textContent.trim())
    return getNextNotEmptyNode(res, siblingKey);
  return res;
}
function getTextNodeOfElNode(el, siblingKey) {
  if (!el || el.nodeType !== ELEMENT_NODE) return;
  let i = 0,
    len = el.childNodes.length;
  if (siblingKey === "previousSibling") i = len - 1;
  while (i >= 0 && i < len) {
    const v = el.childNodes[i];
    const text = v.textContent;
    if (v.nodeType === TEXT_NODE && text.trim()) {
      return v;
    } else if (v.nodeType === ELEMENT_NODE && text.trim()) {
      return getTextNodeOfElNode(v, siblingKey);
    }
    siblingKey === "previousSibling" ? i-- : i++;
  }
}
function getNextNotEmptyTextNode(node, siblingKey) {
  const res = getNextNotEmptyNode(node, siblingKey);
  return (
    res &&
    (res.nodeType === TEXT_NODE ? res : getTextNodeOfElNode(res, siblingKey))
  );
}

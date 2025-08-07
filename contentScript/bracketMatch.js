const LToRMap = {
  "{": "}",
  "[": "]",
  "(": ")",
};
const RToLMap = {
  "}": "{",
  "]": "[",
  ")": "(",
};
const directionMap = {
  1: "nextSibling",
  0: "previousSibling",
};
const endTagNames = ["HTML", "html", "HEAD", "STYLE", "META", "TITLE"];
const excludeTagNames = ["SCRIPT", "IFRAME"];
class BracketMatch {
  constructor(selectText, anchorNode, anchorOffset) {
    this.selectText = selectText;
    this.num = 1;
    this.tarIndex = null;
    this.direction = 1; // 1: to right; 0: to left
    this.targetText = LToRMap[selectText];
    if (RToLMap[selectText]) {
      this.direction = 0;
      this.targetText = RToLMap[selectText];
    }
    this.startTime = Date.now();
    this.res = this.getBracketMatchRes(anchorNode, anchorOffset);
  }
  getBracketMatchRes(anchorNode, anchorOffset) {
    if (Date.now() - this.startTime > 300) return;
    if (
      anchorNode.nodeType !== TEXT_NODE ||
      endTagNames.includes(anchorNode.parentNode.nodeName)
    )
      return;
    if (excludeTagNames.includes(anchorNode.parentNode.nodeName)) {
      return this.recursionFindNode(anchorNode);
    }
    const str = anchorNode.textContent;
    if (!str) return;
    if (this.direction) {
      for (
        let i = isUndef(anchorOffset) ? 0 : anchorOffset + 1;
        i < str.length;
        i++
      ) {
        if (this.getTarIndex(str[i], i)) break;
      }
    } else {
      for (
        let i = isUndef(anchorOffset) ? str.length - 1 : anchorOffset - 1;
        i >= 0;
        i--
      ) {
        if (this.getTarIndex(str[i], i)) break;
      }
    }

    if (this.tarIndex === null) {
      return this.recursionFindNode(anchorNode);
    } else {
      return {
        tarIndex: this.tarIndex,
        node: anchorNode,
      };
    }
  }
  getTarIndex(v, i) {
    if (v === this.selectText) {
      this.num++;
    } else if (v === this.targetText) {
      this.num--;
    }
    if (this.num === 0) {
      this.tarIndex = i;
      return true;
    }
  }

  recursionFindNode(anchorNode) {
    let tarNode = null;
    if (![TEXT_NODE].includes(anchorNode.nodeType)) return;
    tarNode = getNextNotEmptyTextNode(anchorNode, directionMap[this.direction]);
    if (tarNode && tarNode.textContent) {
      return this.getBracketMatchRes(tarNode);
    }
  }
}

function reSelectText() {
  const s = window.getSelection();
  const selectText = s.toString();
  if (LToRMap[selectText] || RToLMap[selectText]) {
    const { anchorNode, anchorOffset } = s; // origin point
    const { res } = new BracketMatch(selectText, anchorNode, anchorOffset);
    if (!res) return;
    const { tarIndex, node } = res;
    let startOffset = anchorOffset,
      endOffset = tarIndex + 1,
      startNode = anchorNode,
      endNode = node;
    if (RToLMap[selectText]) {
      startNode = node;
      startOffset = tarIndex;
      endNode = anchorNode;
      endOffset = anchorOffset + 1;
    }
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    s.removeRange(s.getRangeAt(0));
    s.addRange(range); // re-relect text
  }
}
document.addEventListener("DOMContentLoaded", (_) => {
  document.addEventListener("dblclick", reSelectText);
});

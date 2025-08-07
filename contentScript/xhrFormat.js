/* GET xhr json format */
function init() {
  let children = document.body.childNodes,
    pre = children[0],
    len = ((pre && pre.textContent) || "").length;
  if (
    children.length !== 1 ||
    pre.tagName !== "PRE" ||
    len > 4000000 ||
    len <= 0
  )
    return;
  pre.style.display = "none";
  let obj = isJSON(pre.textContent);
  if (!obj) {
    pre.style.display = "block";
    return;
  }
  const formatDiv = createNodeByHtml(
    `<div id="jsonFormatterModal" json-formatter-modal="1" class="xhrFormatDiv"></div>`
  );
  formatDiv.insertAdjacentHTML("beforeend", getFormattedHtml(obj));
  appendFormatWrapperAndStyle(formatDiv);
  addSwitchComp(formatDiv, pre);
}
function addSwitchComp(formatDiv, pre) {
  const switchDiv = createNodeByHtml(switchHtml);
  switchDiv.addEventListener("click", (e) => {
    let classList = e.target.classList;
    if (classList.contains("toggleFormatBtn")) {
      formatDiv.classList.toggle("hidden");
      classList.toggle("off");
      const isOff = classList.contains("off");
      pre.style.display = isOff ? "block" : "none";
      formatDiv.id = isOff ? "" : "jsonFormatterModal";
    }
  });
  document.head.appendChild(createStyleNode(switchStyleHtml));
  document.body.appendChild(switchDiv);
}
document.addEventListener("DOMContentLoaded", init);

const form = document.querySelector("form");
const regExpInp = document.querySelector(".regExp");
const flagsInp = document.querySelector(".flags");
const replaceStrInp = document.querySelector(".replaceStr");

let data = {};
chrome.storage.local.get(["pattern", "flags", "replaceStr"], function (res) {
  if (res) {
    data = res;
    const { pattern, flags, replaceStr } = res;
    regExpInp.value = pattern || "";
    flagsInp.value = flags || "";
    replaceStrInp.value = replaceStr || "";
  }
});

form.onchange = function (e) {
  let tar = e.target;
  let key = tar.getAttribute("key");
  data[key] = tar.value;
};
document.querySelector(".setOptions").onclick = (_) => {
  chrome.storage.local.set({ ...data }, (_) => {});
};

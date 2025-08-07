const escapeCharacterMap = {
	"<": "&lt;",
	">": "&gt;",
	"&": "&amp;",
	" ": "&nbsp;",
};

function escapeCharacter(str) {
	if (!str) return str;
	return String(str).replace(/<|>|&| /g, (match) => escapeCharacterMap[match]);
}

function isArr(arr) {
	return Array.isArray(arr);
}

function isObjOrArr(obj) {
	return !!obj && typeof obj === "object";
}

function isStr(str) {
	return typeof str === "string";
}

function isObjOrArrEmpty(obj) {
	return Object.keys(obj).length === 0;
}

function isJSON(str) {
	if (!str) return false;
	try {
		const obj = JSON.parse(str);
		if (!!obj && typeof obj === "object") return obj; // isJSON
	} catch (e) {
	}
	return false;
}

function removeNode(dom) {
	if (dom && dom.parentNode) dom.parentNode.removeChild(dom);
}

function isNum(num) {
	return typeof num === "number";
}

function isUndef(v) {
	return v === undefined;
}

function createNodeByHtml(html) {
	let tmp = document.createElement("div");
	tmp.insertAdjacentHTML("beforeend", html);
	let res = tmp.childNodes[0];
	tmp = null;
	return res;
}

function createStyleNode(styleHtml) {
	let style = document.createElement("style");
	style.insertAdjacentHTML("beforeend", styleHtml);
	return style;
}

function showToast(msg) {
	const toast = document.createElement("div");
	toast.textContent = msg;
	toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
    z-index: 10001;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
	document.body.appendChild(toast);
	requestAnimationFrame(() => (toast.style.opacity = "1"));
	setTimeout(() => {
		toast.style.opacity = "0";
		setTimeout(() => toast.remove(), 300);
	}, 2000);
}



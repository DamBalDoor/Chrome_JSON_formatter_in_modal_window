const trimStrToJSONMap = {
	"{": "}",
	"[": "]",
};

function initEvent(dom, styleDom, rawJsonStr) {
	dom.addEventListener("click", (e) => {
		const tar = e.target;
		const tarClass = e.target.classList;
		if (tarClass.contains("jsonFormatterModalToggleExpandBtn")) {
			tar.parentNode.classList.toggle("folded");
		} else if (
			tarClass.contains("jsonFormatterModalCloseModal") ||
			tarClass.contains("jsonFormatterModalWrapper")
		) {
			removeNode(dom);
			removeNode(styleDom);
		} else if (tarClass.contains("jsonFormatterModalCopyBtn")) {
			navigator.clipboard.writeText(rawJsonStr).then(() => {
				showToast("JSON скопирован");
			});
		}
	});
}

function fixJSON(str) {
	// support only key:value
	if (!str) return "";
	str = str.trim();
	if (str.charAt(str.length - 1) === ",") str = str.slice(0, -1);
	str = "{" + str + "}";
	return str;
}

function trimStrToJSON(str) {
	// fetch str between first bracket to last bracket []||{}
	if (!str) return "";
	str = str.trim();
	let i = 0,
		j = str.length - 1,
		left,
		right;
	while (i < j) {
		if (trimStrToJSONMap[str[i]]) {
			right = trimStrToJSONMap[str[i]];
			break;
		}
		i++;
	}
	while (i < j && right) {
		if (str[j] === right) break;
		j--;
	}
	if (right) {
		return str.slice(i, j + 1);
	}
	return "";
}

function isValidData(data) {
	return isJSON(data) || isJSON(fixJSON(data)) || isJSON(trimStrToJSON(data));
}

function invalidJsonTips(data) {
	const frag = document.createDocumentFragment();
	const head = document.createElement("div");
	const content = document.createElement("div");
	head.innerText = "Invalid JSON:";
	head.style.fontSize = "16px";
	content.innerText = data;
	content.style.paddingLeft = "20px";
	frag.appendChild(head);
	frag.appendChild(content);
	return frag;
}

function dealWithRegExp(str, regData) {
	if (!regData) return str;
	let {pattern, flags = "", replaceStr = ""} = regData;
	if (!pattern) return str;
	pattern = pattern.split("\\,");
	flags = flags.split("\\,");
	replaceStr = replaceStr.split("\\,");
	pattern.forEach((v, i) => {
		str = str.replace(new RegExp(v, flags[i]), replaceStr[i] || "");
	});
	return str;
}

function renderModal(msg, regData) {
	if (document.querySelector("#jsonFormatterModal[json-formatter-modal='1']"))
		return;

	const {selectedText} = msg;
	let data = selectedText;

	try {
		data = dealWithRegExp(selectedText, regData);
	} catch (err) {
		console.log(err);
	}

	data = isValidData(data);
	const div = createNodeByHtml(modalHtml);
	const jsonFormatterModalText = div.querySelector(".jsonFormatterModalText");

	if (data) {
		jsonFormatterModalText.insertAdjacentHTML(
			"beforeend",
			getFormattedHtml(data)
		);
	} else {
		jsonFormatterModalText.appendChild(invalidJsonTips(selectedText));
	}
	const jsonText = JSON.stringify(data, null, 2);
	appendFormatWrapperAndStyle(div, jsonText);
}

function appendFormatWrapperAndStyle(div, rawJsonStr) {
	const style = createStyleNode(modalStyleHtml);
	initEvent(div, style, rawJsonStr);

	// Загрузка темы из хранилища и установка класса
	chrome.storage.local.get(["modalTheme"], (res) => {
		const theme = res.modalTheme || "light";
		div.classList.add(theme);
	});

	// Обработчик переключения темы
	const toggleBtn = div.querySelector(".jsonFormatterModalThemeToggle");
	toggleBtn.addEventListener("click", () => {
		const currentTheme = div.classList.contains("dark") ? "dark" : "light";
		const newTheme = currentTheme === "dark" ? "light" : "dark";
		div.classList.remove(currentTheme);
		div.classList.add(newTheme);
		chrome.storage.local.set({ modalTheme: newTheme });
	});


	document.head.appendChild(style);
	document.body.appendChild(div);
}

document.addEventListener("DOMContentLoaded", (_) => {
	chrome.runtime.onMessage.addListener(function (
		request,
		sender,
		sendResponse
	) {
		if (!sender.tab && request.fromBackground) {
			// from the extension
			chrome.storage.local.get(["pattern", "flags", "replaceStr"], function (
				res
			) {
				renderModal(request, res);
			});
			sendResponse("receive text successfully");
		}
	});
});

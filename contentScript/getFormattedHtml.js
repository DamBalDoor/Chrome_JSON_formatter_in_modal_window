function getComma(isEnd) {
	return isEnd ? "" : " ,";
}

function getObjKeyStr(key) {
	key = escapeCharacter(key);
	return `"${key}" :&nbsp;`;
}

function getItems(obj) {
	const itemIsArr = isArr(obj);
	const arr = Object.entries(obj);
	let lis = arr.map(([key, val], index) => {
		const isEnd = index === arr.length - 1;
		if (isObjOrArr(val)) {
			return `<div>${getObjHtml(
				itemIsArr ? undefined : key,
				val,
				isEnd
			)}</div>`;
		} else {
			const keyStr = itemIsArr ? "" : getObjKeyStr(key);
			const valClass = isStr(val) ? "stringVal" : "otherVal";
			const valStr = `<span class="${valClass}">${
				isStr(val) ? `"${escapeCharacter(val)}"` : val
			}</span>`;
			return `<div>${keyStr}${valStr}${getComma(isEnd)}</div>`;
		}
	});
	lis = lis.join("");
	return lis;
}

function getObjHtml(key, obj, isEnd) {
	if (!isObjOrArr(obj)) return obj + "";
	const keyStr = key === undefined ? "" : `<span>${getObjKeyStr(key)}</span>`;
	if (isObjOrArrEmpty(obj))
		return keyStr + (isArr(obj) ? "[ ]" : "{ }") + getComma(isEnd);
	return `<div class="jsonFormatterModalObjContainer">
              <span class="jsonFormatterModalToggleExpandBtn"></span>
              <div>
                ${keyStr}
                <span>${isArr(obj) ? "[" : "{"}</span>
                <div class="jsonFormatterModalExpandedBlock">${getItems(
		obj
	)}</div>
                <span class="jsonFormatterModalEllipsis">...</span>
                <span>${isArr(obj) ? "]" : "}"}${getComma(isEnd)}</span>
              </div>
          </div>`;
}

function getFormattedHtml(data) {
	return `<div style="padding-left:24px;">
    ${getObjHtml(undefined, data, true)}
  </div>`;
}

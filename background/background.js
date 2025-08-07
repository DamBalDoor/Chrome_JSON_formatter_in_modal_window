// Отправка сообщения в активную вкладку
function sendMsgToContentScript(msg, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, msg, function (response) {
      if (typeof callback === "function") callback(response);
    });
  });
}

// Создаём пункт контекстного меню при установке/обновлении расширения
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "jsonFormatterModal",
    title: "JSON Formatter In Modal",
    contexts: ["selection"]
  });
});

// Обработка клика по пункту контекстного меню
chrome.contextMenus.onClicked.addListener((params, tab) => {
  if (params.menuItemId === "jsonFormatterModal") {
    sendMsgToContentScript({
      selectedText: params.selectionText,
      fromBackground: true
    });
  }
});

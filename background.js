chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url && tab.url.includes("youtube.com")) {
        console.log('Tab activated with YouTube. Sending message to content script.');
        chrome.tabs.sendMessage(tab.id, { action: "tabActivated" });
      }
    });
  });
  
  chrome.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === chrome.windows.WINDOW_ID_NONE) return; // No window focused
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tab = tabs[0];
        if (tab.url && tab.url.includes("youtube.com")) {
          console.log('Window focused with YouTube tab. Sending message to content script.');
          chrome.tabs.sendMessage(tab.id, { action: "tabActivated" });
        }
      }
    });
  });
  
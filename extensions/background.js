chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ applicationIsOn: true });
});
chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload();
});
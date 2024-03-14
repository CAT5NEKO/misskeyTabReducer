async function getHostName() {
    const result = await browser.storage.local.get('hostName');
    return result.hostName || '';
}

async function setHostName(hostName) {
    await browser.storage.local.set({hostName});
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setHostName") {
        const { hostName } = message;
        setHostName(hostName);
    }
});

async function manipulateElements(tabId, hideIcons) {
    const hostName = await getHostName();

    browser.tabs.sendMessage(tabId, { action: "manipulateElements", hostName, hideIcons });
}

browser.tabs.onActivated.addListener(activeInfo => {
    manipulateElements(activeInfo.tabId);
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        manipulateElements(tabId);
    }
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "manipulateElements") {
        const { hostName, hideIcons } = message;

    }
});

document.addEventListener('DOMContentLoaded', async function () {
    console.log('popup.js: DOMContentLoaded');
    const hostNameInput = document.getElementById('hostNameInput');
    const iconCheckboxes = document.querySelectorAll('.iconCheckbox');
    const saveButton = document.getElementById('saveButton');

    saveButton.addEventListener('click', async function () {
        console.log('saveButton: click');
        const hostName = hostNameInput.value.trim();
        console.log('hostName:', hostName);
        const hideIcons = {};

        iconCheckboxes.forEach(checkbox => {
            hideIcons[checkbox.value] = checkbox.checked;
        });
        console.log('hideIcons:', hideIcons);

        browser.runtime.sendMessage({ action: "setHostName", hostName });

        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        const tabId = tabs[0].id;
        await manipulateElements(tabId, hideIcons);

        console.log('saveButton: close');
        window.close();
    });

    const { hostName, hideIcons } = await browser.storage.local.get(['hostName', 'hideIcons']);
    hostNameInput.value = hostName || '';

    iconCheckboxes.forEach(checkbox => {
        checkbox.checked = hideIcons && hideIcons[checkbox.value];
    });

    iconCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', async function () {
            const hideIcons = {};
            iconCheckboxes.forEach(cb => {
                hideIcons[cb.value] = cb.checked;
            });

            const tabs = await browser.tabs.query({ active: true, currentWindow: true });
            const tabId = tabs[0].id;
            await manipulateElements(tabId, hideIcons);

            await browser.storage.local.set({ hideIcons });
        });
    });
});

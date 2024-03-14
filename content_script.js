browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "manipulateElements") {
        const { hostName } = message;
        console.log('Received hostName:', hostName);

        const iconsToHide = ['ti-antenna', 'ti-list', 'ti-universe', 'ti-planet', 'ti-home'];
        iconsToHide.forEach(iconName => {
            const elements = document.querySelectorAll(`button._button.xo5lq.xvOIQ i.xn4Pz.ti.${iconName}`);
            elements.forEach(element => {
                const buttonElement = element.closest('button._button.xo5lq.xvOIQ');
                if (buttonElement) {
                    buttonElement.style.display = 'none';
                }
            });
        });
    }
});

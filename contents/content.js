import { EXCEPTIONS, extentionStorage } from "../module/storage.js";

function injectWebAuthnScript() {
    return new Promise((resolve) => {
        const injectedDom = document.createElement('script');
        injectedDom.src = chrome.runtime.getURL('contents/injectedWebAuthn.js');
        injectedDom.onload = () => resolve();
        (document.head || document.documentElement).insertAdjacentElement("afterbegin", injectedDom);
    });
}

(async function init() {
    await injectWebAuthnScript();
    await extentionStorage.clearDomExp();
    extentionStorage.onChangedDomExp((domName) => {
        const domExp = EXCEPTIONS[domName];
        window.postMessage({from:'contentScript', domExp}, '*');
    });
})();


import { EXCEPTIONS, extentionStorage } from "../module/storage.js";

function injectScript(path) {
    return new Promise((resolve) => {
        const injectedDom = document.createElement('script');
        injectedDom.src = chrome.runtime.getURL(path);
        injectedDom.onload = () => resolve();
        (document.head || document.documentElement).insertAdjacentElement("afterbegin", injectedDom);
        console.log('injected', path);
    });
}

function injectWebAuthnScript() {
    return injectScript('contents/webauthnInjector/injectedWebAuthn.js');
}

async function injectPublicKeyScript() {
    const availabilityStatus = await extentionStorage.getAvailability();
    if (!availabilityStatus.enableEdit) {
        return;
    }
    if (!availabilityStatus.publicKeyCredential) {
        injectScript('contents/publicKeyInjector/undefinedPublicKey.js');
        return;
    }
    if (!availabilityStatus.isUserVerifyingPlatformAuthenticatorAvailable) {
        injectScript('contents/publicKeyInjector/unableUVPAA.js');
    }
    if (!availabilityStatus.isConditionalMediationAvailable) {
        injectScript('contents/publicKeyInjector/unableCM.js');
    }
}

(async function init() {
    injectPublicKeyScript();
    await injectWebAuthnScript();
    // send at first
    extentionStorage.getDomExpName().then((domName) => {
        if (!domName) return;
        const domExp = EXCEPTIONS[domName];
        window.postMessage({from:'contentScript', domExp}, '*');
    });
    // send onchanged
    extentionStorage.onChangedDomExpName((domName) => {
        const domExp = EXCEPTIONS[domName];
        window.postMessage({from:'contentScript', domExp}, '*');
    });
})();


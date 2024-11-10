export const EXCEPTIONS = {
    NotAllowedError: new DOMException('The operation either timed out or was not allowed.', 'NotAllowedError'),
    InvalidStateError: new DOMException('The user attempted to register an authenticator that contains one of the credentials already registered with the relying party.', 'InvalidStateError'),
    NotSupportedError: new DOMException('The operation options is not supported by this device.', 'NotSupportedError'),
    AbortError: new DOMException('The operation is Aborted.', 'AbortError'),
    UnknownError: new DOMException('The operation is failed for an unknown transient reason.', 'UnknownError'),
}

export const extentionStorage = {
    clearDomExp: async function() {
        await chrome.storage.local.clear();
    },
    setDomExp: function(domExpName) {
        chrome.storage.local.set({ exceptionName: domExpName });
    },
    onChangedDomExp: function(callback) {
        chrome.storage.onChanged.addListener((changes) => {
            if (!changes.exceptionName) return;
            callback(changes.exceptionName.newValue)
        });
    },
    getAvailability: function() {
        return chrome.storage.local.get('webauthnAvailabilty');
    }
}

export const EXCEPTIONS = {
    NotAllowedError: new DOMException('The operation either timed out or was not allowed.', 'NotAllowedError'),
    InvalidStateError: new DOMException('The user attempted to register an authenticator that contains one of the credentials already registered with the relying party.', 'InvalidStateError'),
    NotSupportedError: new DOMException('The operation options is not supported by this device.', 'NotSupportedError'),
    AbortError: new DOMException('The operation is Aborted.', 'AbortError'),
    UnknownError: new DOMException('The operation is failed for an unknown transient reason.', 'UnknownError'),
}

export const extentionStorage = {
    clearDomExp: async function() {
        return new Promise((resolve) => {
            chrome.storage.local.remove('exceptionName', () => {
                resolve();
            });
        });
    },
    setDomExp: function(domExpName) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ exceptionName: domExpName }, () => {
                resolve();
            })
        });
    },
    onChangedDomExp: function(callback) {
        chrome.storage.onChanged.addListener((changes) => {
            if (!changes.exceptionName) return;
            callback(changes.exceptionName.newValue)
        });
    },
    getAvailability: function() {
        return new Promise((resolve) => {
            chrome.storage.local.get('availabilityStatus', (result) => {
                resolve(result.availabilityStatus);
            });
        });
    },
    setAvailability: function(availabilityStatus) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ availabilityStatus: availabilityStatus }, () => {
                resolve();
            });
        })
    },
    onChangedAvailability: function(callback) {
        chrome.storage.onChanged.addListener((changes) => {
            if (!changes.availabilityStatus) return;
            callback(changes.availabilityStatus.newValue)
        });
    }
}

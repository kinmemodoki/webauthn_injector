export const EXCEPTIONS = {
    NotAllowedError: new DOMException('This error was caused by a Chrome extension for debugging.', 'NotAllowedError'),
    InvalidStateError: new DOMException('This error was caused by a Chrome extension for debugging.', 'InvalidStateError'),
    NotSupportedError: new DOMException('This error was caused by a Chrome extension for debugging.', 'NotSupportedError'),
    AbortError: new DOMException('This error was caused by a Chrome extension for debugging.', 'AbortError'),
    TimeoutError: new DOMException('This error was caused by a Chrome extension for debugging.', 'TimeoutError'),
    UnknownError: new DOMException('This error was caused by a Chrome extension for debugging.', 'UnknownError'),
}

export const extentionStorage = {
    clearDomExpName: async function() {
        return new Promise((resolve) => {
            chrome.storage.local.remove('exceptionName', () => {
                resolve();
            });
        });
    },
    setDomExpName: function(domExpName) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ exceptionName: domExpName }, () => {
                resolve();
            });
        });
    },
    getDomExpName: function() {
        return new Promise((resolve) => {
            chrome.storage.local.get('exceptionName', (result) => {
                resolve(result.exceptionName);
            });
        });
    },
    onChangedDomExpName: function(callback) {
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

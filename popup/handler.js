import { EXCEPTIONS, extentionStorage } from "../module/storage.js";
import { AvailabilityStatus } from "../module/availabilityStatus.js";

// Inject Error
(async () => {
    const exceptionTable = new Map([
        // exceptionName: dom
        [EXCEPTIONS.NotAllowedError.name, document.getElementById('notAllowedError')],
        [EXCEPTIONS.InvalidStateError.name, document.getElementById('invalidStateError')],
        [EXCEPTIONS.NotSupportedError.name, document.getElementById('notSupportedError')],
        [EXCEPTIONS.AbortError.name, document.getElementById('abortError')],
        [EXCEPTIONS.TimeoutError.name, document.getElementById('timeoutError')],
        [EXCEPTIONS.UnknownError.name, document.getElementById('unknownError')]
    ]);

    // initialize
    extentionStorage.getDomExpName().then((currentDomExpName) => {
        if (!currentDomExpName) return;
        const currentEnableDom = exceptionTable.get(currentDomExpName);
        currentEnableDom.checked = true;
    });

    // set onchanged
    exceptionTable.forEach((dom, domExpName) => {
        dom.addEventListener('change', (ev) => {
            if (ev.target.checked) { 
                extentionStorage.setDomExpName(domExpName);
            } else {
                extentionStorage.clearDomExpName();
            }
        });
    });
})();

// Edit Availability
(async () => {
    let availabilityStatus = await extentionStorage.getAvailability();
    if (
        !availabilityStatus
        || (
            !availabilityStatus.enableEdit
            && !availabilityStatus.publicKeyCredential
            && !availabilityStatus.isUserVerifyingPlatformAuthenticatorAvailable
            && !availabilityStatus.isConditionalMediationAvailable
        )
    ) {
        // initialize availability
        const status = new AvailabilityStatus();
        await status.loadDeviceConfig();
        availabilityStatus = status.toPrimitiveObject(); // format for chrome storage
        await extentionStorage.setAvailability(availabilityStatus);
    }
    const enableEditCheckbox = document.getElementById("enableEditAvailability");
    const supportPKCCheckbox = document.getElementById("supportPublicKeyCredential");
    const supportUVPAACheckbox = document.getElementById("supportUVPAA");
    const supportCMCheckbox = document.getElementById("supportConditionalMediation");

    enableEditCheckbox.addEventListener("change", () => {
        availabilityStatus.enableEdit = enableEditCheckbox.checked;
        extentionStorage.setAvailability(availabilityStatus);
    });
    supportPKCCheckbox.addEventListener("change", () => {
        availabilityStatus.publicKeyCredential = supportPKCCheckbox.checked;
        extentionStorage.setAvailability(availabilityStatus);
    });
    supportUVPAACheckbox.addEventListener("change", () => {
        availabilityStatus.isUserVerifyingPlatformAuthenticatorAvailable = supportUVPAACheckbox.checked;
        extentionStorage.setAvailability(availabilityStatus);
    });
    supportCMCheckbox.addEventListener("change", () => {
        availabilityStatus.isConditionalMediationAvailable = supportCMCheckbox.checked;
        extentionStorage.setAvailability(availabilityStatus);
    });
})();

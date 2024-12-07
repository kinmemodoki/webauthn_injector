import { EXCEPTIONS, extentionStorage } from "../module/storage.js";
import { AvailabilityStatus } from "../module/availabilityStatus.js";

// Inject Error
document.getElementById('notAllowedError').addEventListener('click', () => {
    let expName = EXCEPTIONS.NotAllowedError.name;
    extentionStorage.setDomExp(expName);
});
document.getElementById('invalidStateError').addEventListener('click', () => {
    let expName = EXCEPTIONS.InvalidStateError.name;
    extentionStorage.setDomExp(expName);
});
document.getElementById('notSupportedError').addEventListener('click', () => {
    let expName = EXCEPTIONS.NotSupportedError.name;
    extentionStorage.setDomExp(expName);
});
document.getElementById('abortError').addEventListener('click', () => {
    let expName = EXCEPTIONS.AbortError.name;
    extentionStorage.setDomExp(expName);
});
document.getElementById('timeoutError').addEventListener('click', () => {
    let expName = EXCEPTIONS.TimeoutError.name;
    extentionStorage.setDomExp(expName);
});
document.getElementById('unknownError').addEventListener('click', () => {
    let expName = EXCEPTIONS.UnknownError.name;
    extentionStorage.setDomExp(expName);
});

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
        availabilityStatus = status.toPrimitiveObject(); // format to chrome storage
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

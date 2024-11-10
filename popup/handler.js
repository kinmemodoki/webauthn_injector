import { EXCEPTIONS, extentionStorage } from "../module/storage.js";

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

document.getElementById('unknownError').addEventListener('click', () => {
    let expName = EXCEPTIONS.UnknownError.name;
    extentionStorage.setDomExp(expName);
});

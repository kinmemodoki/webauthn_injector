(async() => {
    const src = chrome.runtime.getURL("contents/content.js");
    import(src);
})();

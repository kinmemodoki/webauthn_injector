(async() => {
    const src = chrome.runtime.getURL("contents/content.js");
    const contentMain = await import(src);
})();

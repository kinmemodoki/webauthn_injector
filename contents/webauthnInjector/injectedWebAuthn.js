(function() {
    const originalCredCreate = navigator.credentials.create;
    const originalCredGet = navigator.credentials.get;
    window.addEventListener('message', (event) => {
        if (event.source !== window || event.data.from !== 'contentScript') return;
        if (event.data.domExp) {
            console.log(event.data.domExp);
            let domExp = event.data.domExp
            if (!(domExp instanceof DOMException)) return;
            navigator.credentials.get = async function() {
                throw domExp;
            };
            navigator.credentials.create = async function() {
                throw domExp;
            };
            return;
        } else {
            navigator.credentials.get = originalCredGet;
            navigator.credentials.create = originalCredCreate;
        }
    });
})();

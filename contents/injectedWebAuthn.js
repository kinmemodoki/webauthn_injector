(function() {
    window.addEventListener('message', (event) => {
        console.log(event)

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
        }
    });
})();

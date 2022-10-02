
const IO = (function() {

    const ENCODING = "utf-8";
    
    async function loadFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', (event) => {
                resolve(event.target.result);
            });
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    function decodeContent(content, encoding) {
        encoding ||= ENCODING;
        const decoder = new TextDecoder(encoding);
        return decoder.decode(content);
    }

    return {loadFile,decodeContent}
})();


export {IO}
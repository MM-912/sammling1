const tools = {

    getElement:(key) =>{
        return document.body.querySelector(key);
    },


    loadJsonSources:async (source) =>  {

        let output = null;
        try {
            output = await (await fetch(source)).json()
        } catch (e) {
            console.error(e);
        }
    
        return output;
    }
}

export {tools}
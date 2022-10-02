const tools = {

    getElement: (key) => {
        return document.body.querySelector(key);
    },

    saveSource: async (data, name) => {

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        const resp  = await fetch(`/save/${name}`, config)

        return resp.status < 400;

    },

    loadJsonSources: async (source) => {

        let output = null;
        try {
            output = await (await fetch(source)).json()
        } catch (e) {
            console.error(e);
        }

        return output;
    }
}

export { tools }
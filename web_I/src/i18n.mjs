//import * as i18nSource from "../data/i18n.json"
import { tools } from "./util.mjs"


const i18n = function (lang) {
    
    const DEFAULT_LANG = "uk"
    let dictionary = {};
    let language = lang || DEFAULT_LANG;

    async function init(source){
        dictionary = await tools.loadJsonSources(source)
        
        language = dictionary[language] ? language:DEFAULT_LANG;
        
        let languages = getLanguages();
        language = languages.find( lang => {
            return lang.includes(language)
        }) || language;

        if(dictionary[language] === undefined){
            dictionary[language] = {};
        } 
        

        return {getkey, getLanguages, hasLanguage, translateElement}
    }

function translateElement(key,element){
    element.innerText = getkey(key,element.innerText);
}

    function hasLanguage(lang){
        return dictionary[lang] !== undefined;
    }

    function getLanguages(){
        return Object.keys(dictionary);
    }

    function getkey(key, fallback){
        fallback ||= null;
        return (dictionary[language][key] || fallback) ;
    }

    return {
        init
    }

}


export { i18n }
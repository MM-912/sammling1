
const list = "PLuKoJWkcJCp7EAaosuZEyrtC4ASe3lLxV";
const vid = "fmQA9fxQvoQ&list";

let content = null;

fetch(`https://www.youtube.com/watch?v=${vid}&list=${list}`)
  .then(async (res) => {
    console.log(res.status);
    if(res.status < 400){
        let page = await res.text();
        console.log(page);
        // https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
    }
  })
  .catch((e) => {
    console.log(e);
  });

//console.log(content);
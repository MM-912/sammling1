import { tools as t } from "./util.mjs";
const practiceView = t.getElement("#practiceView");
const menuView = t.getElement("#menuView");
const cardView = t.getElement("#cardView");
const frontOfCard = t.getElement(".front");
const backOfCard = t.getElement(".back");
const previousButton = t.getElement("#prev");
const nextButton = t.getElement("#next");
const exitButton = t.getElement("#exit");

let collectionSrc = [];
let collections = [];
let currentCollection = null;

let currentCardIndex = 0;


cardView.onclick = (evt) => {
    cardView.classList.toggle("rotate");
}

previousButton.onclick = (evt) => { changeCard(-1) }

nextButton.onclick = (evt) => { changeCard(1); }

function changeCard(direction) {
    currentCardIndex += 1 * direction;
    currentCardIndex = bound(currentCardIndex, 0, currentCollection.cards.length - 1);
    updateNavigationButtonState(currentCardIndex);
    resetCardView();
    displayCard(currentCollection.cards[currentCardIndex]);
}

function updateNavigationButtonState(index) {
    previousButton.removeAttribute("disabled")
    nextButton.removeAttribute("disabled")
    if (index == 0) {
        previousButton.setAttribute("disabled", true)
    } else if (index == currentCollection.cards.length - 1) {
        nextButton.setAttribute("disabled", true)
    }
}

function resetCardView() {
    frontOfCard.innerHTML = "";
    backOfCard.innerHTML = "";
    cardView.classList.remove("rotate");
}

function bound(value, min, max) {

    if (value < min) {
        value = min;
    } else if (value > max) {
        value = max;
    }

    return value;
}

function displayCard(card) {
    frontOfCard.innerHTML = card.front;
    backOfCard.innerHTML = card.back;
}

async function loadSources(sources) {
    const collections = [];
    for (const source of sources) {
        const col = (await (await fetch("data/" + source)).json());
        collections.push(col);
    }
    return collections;
}

function startPCardCollection(collection) {
    currentCollection = collection;
    currentCardIndex = 0;
    updateNavigationButtonState(currentCardIndex);
    displayCard(currentCollection.cards[currentCardIndex]);
    menuView.classList.add("hidden");
    practiceView.classList.remove("hidden");
}

function displayMenu(){
    menuView.classList.remove("hidden");
    practiceView.classList.add("hidden");
}

await (async function init() {

    practiceView.classList.add("hidden");

    collectionSrc = (await(await fetch("/collections")).json());

    //collections.unshift(...(await loadSources(collectionSrc));
    collections = await loadSources(collectionSrc);

    for (let col of collections) {
        const bt = document.createElement("Button");
        bt.innerText = col.title;
        bt.onclick = function () {
            startPCardCollection(col);
        }
        menuView.appendChild(bt);
    }

    exitButton.onclick = function () {
        displayMenu();
    }

})();






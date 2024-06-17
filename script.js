let button;
let img;

const URL = "https://dog.ceo/api/breeds/image/random";
const options = {
  method: "GET",
}

const main = () => {
  getElements();
  addListeners();
}

const getElements = () => {
  button = document.querySelector("button");
  img = document.querySelector("img");
}

const addListeners = () => {
  button.addEventListener("click", fetchData);
}

async function fetchData() {
  try {
    const response = await fetch(URL, options); // Poczekaj, aż przyjdzie odpowiedź
    const dataReady = await response.json(); // Poczekaj, aż dane zostaną skonwertowane do obiektu JSON
    img.setAttribute("src", dataReady.message);
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("DOMContentLoaded", main);
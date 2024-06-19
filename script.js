const main = () => {
  getElements();
  addListeners();
}

const getElements = () => {
  console.log("Dodaję elementy...");
}

const addListeners = () => {
  console.log("Dodaję zdarzenia...");
}

window.addEventListener("DOMContentLoaded", main);
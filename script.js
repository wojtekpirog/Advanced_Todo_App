let appHeader;
let footerYear;

const main = () => {
  getElements();
  addListeners();
  setCurrentYear();
}

const getElements = () => {
  appHeader = document.querySelector(".content-wrapper span");
  footerYear = document.querySelector("footer span");
}

const addListeners = () => {
  console.log("Dodaję zdarzenia...");
}

const setCurrentYear = () => {
  const year = new Date().getFullYear();
  appHeader.innerText = year;
  footerYear.innerText = year;
}

window.addEventListener("DOMContentLoaded", main);
let leftCurrencyInput;
let rightCurrencyInput;
let leftCurrencySelect;
let rightCurrencySelect;
let swapButton;
let rateInfo;

const HOST = "api.frankfurter.app";

const main = () => {
  getElements();
  addListeners();
  populateCurrencyDropdowns();
}

const getElements = () => {
  leftCurrencyInput = document.querySelector(".amount-one");
  rightCurrencyInput = document.querySelector(".amount-two");
  leftCurrencySelect = document.querySelector(".currency-one");
  rightCurrencySelect = document.querySelector(".currency-two");
  swapButton = document.querySelector(".swap-btn");
  rateInfo = document.querySelector(".rate-info");
}

const addListeners = () => {
  leftCurrencySelect.addEventListener("change", convert);
  rightCurrencySelect.addEventListener("change", convert);
  leftCurrencyInput.addEventListener("input", convert);
  swapButton.addEventListener("click", swapCurrencies);
}

const populateCurrencyDropdowns = () => {
  fetch(`https://${HOST}/currencies`)
    .then((response) => response.json())
    .then((dataReady) => {
      const arrayOfCurrencies = Object.entries(dataReady).map(([code, name]) => ({
        code: code,
        name: name
      }));

      arrayOfCurrencies.forEach(({code, name}) => {
        const option = document.createElement("option");
        option.setAttribute("value", code);
        option.setAttribute("title", code);
        code === "PLN" && option.setAttribute("selected", "selected");
        option.textContent = name;

        leftCurrencySelect.appendChild(option);
      });

      arrayOfCurrencies.forEach(({code, name}) => {
        const option = document.createElement("option");
        option.setAttribute("value", code);
        option.setAttribute("title", code);
        code === "USD" && option.setAttribute("selected", "selected");
        option.textContent = name;

        rightCurrencySelect.appendChild(option);
      });
    })
    .catch((error) => console.error(error));

    setTimeout(() => {
      convert();
    }, 1000);
}

const convert = () => {
  const leftCurrency = leftCurrencySelect.value;
  const rightCurrency = rightCurrencySelect.value;

  if (leftCurrency === rightCurrency) {
    rightCurrencyInput.value = leftCurrencyInput.value;
    rateInfo.textContent = `${leftCurrencyInput.value} ${leftCurrency} = ${rightCurrencyInput.value} ${rightCurrency}`;
  } else {
    fetch(`https://${HOST}/latest?amount=${leftCurrencyInput.value}&from=${leftCurrencySelect.value}&to=${rightCurrencySelect.value}`)
      .then((response) => response.json())
      .then((dataReady) => {
        const rate = dataReady.rates[rightCurrency];
  
        rateInfo.textContent = `${leftCurrencyInput.value} ${leftCurrency} = ${rate.toFixed(4)} ${rightCurrency}`;
        rightCurrencyInput.value = rate.toFixed(2);
      })
      .catch((error) => console.error(error));
  }
}

const swapCurrencies = () => {
  const temporaryValue = leftCurrencySelect.value;
  leftCurrencySelect.value = rightCurrencySelect.value;
  rightCurrencySelect.value = temporaryValue;
  convert();
}

window.addEventListener("DOMContentLoaded", main);
let appHeader;
let footerYear;
let tasksContainer;
let taskNameInput;
let addTaskButton;
let errorText;
let taskTemplate;
let taskModal;

// Zmienna globalna, która przechowuje id zadania:
let taskID = 0;

const main = () => {
  getElements();
  addListeners();
  setCurrentYear();
}

const getElements = () => {
  appHeader = document.querySelector(".content-wrapper span");
  footerYear = document.querySelector("footer span");
  tasksContainer = document.querySelector(".tasks-container");
  taskNameInput = document.querySelector(".add-task > input");
  addTaskButton = document.querySelector(".add-task > button");
  errorText = document.querySelector(".error-message");
  taskTemplate = document.querySelector(".task-template");
  taskModal = document.querySelector(".task-modal");
}

const addListeners = () => {
  addTaskButton.addEventListener("click", addTask);
  taskNameInput.addEventListener("keydown", enterCheck);
}

const addTask = () => {
  const taskName = taskNameInput.value;

  if (!taskName) {
    displayError("Don't forget to put a task name!");
  } else if (taskName.length < taskNameInput.minLength || taskName.length > taskNameInput.maxLength) {
    displayError(`Task name must be between ${taskNameInput.minLength} and ${taskNameInput.maxLength} characters!`);
  } else {
    clearError();
    createTask(taskName);
  }
}

// Funkcja tworząca zadanie (nie musi nawet przyjmować parametru z ID):

const createTask = (taskName) => {
  taskID += 1;

  const newTask = document.createElement("div");
  newTask.setAttribute("id", taskID);
  newTask.classList.add("task");

  const templateContent = taskTemplate.content.cloneNode(true);
  const taskText = templateContent.querySelector(".task-text");
  taskText.textContent = taskName;

  newTask.append(templateContent);
  tasksContainer.appendChild(newTask);

  taskNameInput.value = "";
}

const enterCheck = (event) => {
  console.log(`KeyboardEvent: key = ${event.key} | code = ${event.code} | keyCode = ${event.keyCode}`);
  if (event.code === "Enter") {
    event.preventDefault();
    addTask();
  }
}

const displayError = (errorMessage) => {
  taskNameInput.style.borderColor = "#bc4749";
  errorText.style.display = "block";
  errorText.textContent = errorMessage;
}

const clearError = () => {
  taskNameInput.style.borderColor = "#9D4EDD";
  errorText.textContent = "";
  errorText.style.display = "none";
}

const openModal = () => {
  taskModal.classList.add("task-modal--active");
}

const closeModal = () => {
  taskModal.classList.add("task-modal--active");
}

const setCurrentYear = () => {
  const year = new Date().getFullYear();
  appHeader.innerText = year;
  footerYear.innerText = year;
}


document.addEventListener("DOMContentLoaded", main);
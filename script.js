// Header & footer
let appHeader;
let footerYear;
// Tasks container
let tasksContainer;
let taskNameInput;
let addTaskButton;
let errorText;
let deleteAllButton;
// Task template
let taskTemplate;
// Task edition modal
let taskModal;
let taskModalInput;
let taskModalErrorText;
let editTaskBtn;
let closeModalBtn;

// Zmienna globalna, która przechowuje id zadania:
let taskID = 0;
// Zmienna globalna, która przechowuje edytowane zadanie:
let taskToEdit;

const main = () => {
  getElements();
  addListeners();
  setCurrentYear();
}

const getElements = () => {
  // Header & footer
  appHeader = document.querySelector(".content-wrapper span");
  footerYear = document.querySelector("footer span");
  // Tasks container
  tasksContainer = document.querySelector(".tasks-container");
  taskNameInput = document.querySelector(".add-task > input");
  addTaskButton = document.querySelector(".add-task > button");
  errorText = document.querySelector(".error-message");
  deleteAllButton = document.querySelector(".delete-all-tasks-button");
  // Task template
  taskTemplate = document.querySelector(".task-template");
  // Task edition modal
  taskModal = document.querySelector(".task-modal");
  taskModalInput = taskModal.querySelector(".task-modal__input");
  taskModalErrorText = taskModal.querySelector(".error-message");
  editTaskBtn = taskModal.querySelector(".task-modal__button--accept");
  closeModalBtn = taskModal.querySelector(".task-modal__button--cancel");
}

const addListeners = () => {
  // Tasks container
  tasksContainer.addEventListener("click", checkClick);
  addTaskButton.addEventListener("click", addTask);
  taskNameInput.addEventListener("keydown", enterCheck);
  deleteAllButton.addEventListener("click", deleteAllTasks);
  // Task edition modal
  taskModalInput.addEventListener("keydown", enterCheck);
  editTaskBtn.addEventListener("click", changeTodo);
  closeModalBtn.addEventListener("click", closeModal);
}

const addTask = () => {
  const taskName = taskNameInput.value;

  if (!taskName) {
    displayError("Don't forget to put a task name!", taskNameInput, errorText);
  } else if (taskName.length < taskNameInput.minLength || taskName.length > taskNameInput.maxLength) {
    displayError(`Task name must be between ${taskNameInput.minLength} and ${taskNameInput.maxLength} characters!`, taskNameInput, errorText);
  } else {
    clearError(taskNameInput, errorText);
    createTask(taskName);
  }
}

const createTask = (taskName) => {
  taskID += 1;

  const newTask = document.createElement("li");
  newTask.setAttribute("id", taskID);
  newTask.classList.add("task");

  const templateContent = taskTemplate.content.cloneNode(true);
  const taskText = templateContent.querySelector(".task-text");
  taskText.textContent = taskName;

  newTask.append(templateContent);
  tasksContainer.appendChild(newTask);

  taskNameInput.value = "";
  deleteAllButton.style.display = "block";
}

const enterCheck = (event) => {
  if (event.code === "Enter") {
    if (event.target === taskNameInput) {
      addTask();
    } else if (event.target === taskModalInput) {
      event.preventDefault();
      changeTodo();
    }
  }
}

const checkClick = (event) => {
  // Jeśli `event.target` ma jakieś klasy:
  if (event.target.classList.value !== "") {
    if (event.target.closest("button").classList.contains("task-button--complete")) {
      toggleTaskStatus(event);
    } else if (event.target.closest("button").classList.contains("task-button--edit")) {
      editTask(event);
    } else if (event.target.closest("button").classList.contains("task-button--delete")) {
      deleteTask(event);
    }
  }
}

const toggleTaskStatus = (event) => {
  const taskText = event.target.closest(".task").firstElementChild;
  taskText.classList.toggle("task-text--completed");

  taskText.classList.contains("task-text--completed")
    ? event.target.closest("button").innerHTML = '<i class="fa-solid fa-rotate-left" aria-hidden="true"></i>' 
    : event.target.closest("button").innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>';
}

const deleteTask = (event) => {
  const task = event.target.closest(".task");
  tasksContainer.removeChild(task);

  if (tasksContainer.innerHTML === "") {
    errorText.style.display = "block";
    errorText.textContent = "No tasks on the list!";
    deleteAllButton.style.display = "none";
  }
}

const deleteAllTasks = () => {
  tasksContainer.innerHTML = "";
  errorText.style.display = "block";
  errorText.textContent = "No tasks on the list!";
  deleteAllButton.style.display = "none";
}

const displayError = (errorMessage, input, error) => {
  input.style.borderColor = "#bc4749";
  error.style.display = "block";
  error.textContent = errorMessage;
}

const clearError = (input, error) => {
  input.style.borderColor = "#9D4EDD";
  error.textContent = "";
  error.style.display = "none";
}

const editTask = (event) => {
  taskModal.classList.add("task-modal--active");

  const taskID = event.target.closest("li").id;
  taskToEdit = document.getElementById(taskID);

  taskModalInput.value = taskToEdit.firstElementChild.textContent;
}

const changeTodo = () => {
  if (!taskModalInput.value) {
    displayError("Don't forget to put a task name!", taskModalInput, taskModalErrorText);
  } else if (taskModalInput.value.length < taskModalInput.minLength || taskModalInput.value.length > taskModalInput.maxLength) {
    displayError(`Task name must be between ${taskModalInput.minLength} and ${taskModalInput.maxLength} characters!`, taskModalInput, taskModalErrorText);
  } else {
    taskToEdit.firstElementChild.textContent = taskModalInput.value;
    clearError(taskModalInput, taskModalErrorText);
    closeModal();
  }
}

const closeModal = () => {
  taskModal.classList.remove("task-modal--active");
}

const setCurrentYear = () => {
  const year = new Date().getFullYear();
  appHeader.innerText = year;
  footerYear.innerText = year;
}


document.addEventListener("DOMContentLoaded", main);
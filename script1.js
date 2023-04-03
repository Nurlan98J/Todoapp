"use strict";

let task = document.querySelector("#task");
let addTaskBtn = document.getElementById("addTask");
let ul = document.querySelector("#task-list");

// Получаем список задач из локального хранилища
let tasks = JSON.parse(localStorage.getItem('tasks'));

// Если ничего не было сохранено, создаем пустой массив
if (!tasks) {
  tasks = [];
}

// Функция для сохранения списка задач в локальном хранилище
function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для добавления задачи в список
function addTask(task) {
  tasks.push(task);
  saveTasksToLocalStorage(tasks);
}

// Функция для удаления задачи из списка
function removeTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage(tasks);
}

// Функция для обновления задачи в списке
function updateTask(index, task) {
  tasks[index] = task;
  saveTasksToLocalStorage(tasks);
}

// При загрузке страницы выводим список задач
function renderTasks() {
  ul.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <button class="done">Done</button>
      <button class="del">Del</button>
      <hr>
    `;
    const removeBtn = li.querySelector('.del');
    removeBtn.addEventListener('click', () => {
      removeTask(index);
      renderTasks();
    });
    const doneBtn = li.querySelector('.done');
    doneBtn.addEventListener('click', () => {
      li.classList.toggle('active');
    });
    ul.appendChild(li);
  });
}

// Обработчик события для добавления задачи в список
addTaskBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const taskValue = task.value.trim();
  if (taskValue) {
    addTask(taskValue);
    task.value = '';
    renderTasks();
  }
});

// Выводим список задач при загрузке страницы
renderTasks();

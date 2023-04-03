"use strict";

let task = document.querySelector("#task");
let addTaskBtn = document.getElementById("addTask");
let ul = document.querySelector("#task-list");


let tasks = JSON.parse(localStorage.getItem('tasks'));


if (!tasks) {
  tasks = [];
}


function saveTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask(task) {
  tasks.push(task);
  saveTasksToLocalStorage(tasks);
}


function removeTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage(tasks);
}


function updateTask(index, task) {
  tasks[index] = task;
  saveTasksToLocalStorage(tasks);
}


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


addTaskBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const taskValue = task.value.trim();
  if (taskValue) {
    addTask(taskValue);
    task.value = '';
    renderTasks();
  }
});


renderTasks();

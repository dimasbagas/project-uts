document.addEventListener("DOMContentLoaded", function() {
  fetchTasks();
});

function fetchTasks() {
  fetch('/tasks')
    .then(response => response.json())
    .then(data => {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = "";
      data.forEach(task => {
        addTaskToDOM(task);
      });
    });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const timeInput = document.getElementById('timeInput');
  const taskText = taskInput.value.trim();
  const taskTime = timeInput.value;

  if (taskText !== "" && taskTime !== "") {
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: taskText, time: taskTime })
    })
    .then(response => response.json())
    .then(data => {
      addTaskToDOM(data);
      taskInput.value = "";
      timeInput.value = "";
    });
  }
}

function deleteTask(taskId, element) {
  fetch('/tasks/' + taskId, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    element.remove();
  });
}

function addTaskToDOM(task) {
  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.innerHTML = `${task.task} ${task.time} <button class="delete-btn" onclick="deleteTask(${task.id}, this.parentElement)">Delete</button>`;
  taskList.appendChild(li);
}

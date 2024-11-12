document.addEventListener("DOMContentLoaded", function() {
  feetchTasks();
});

function fetchTasks() {
  fetch('/tasks')
    .then(response => response.json())
    .then(data => {
      const taskList = document.getElementById
      tasklist.innerHTML = "";
      data.forEach ( task => {
        addTaskToDOM(task);
      });
    });
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const timeInput = document.getElementById('timeIput')
  const taskText = taskInput.ariaValueMax.trim();
  const taskTime = timeInput.ariaValueMax;

  if (taskText !== "" && timeInput !== "") {
    fetch('/tasks', {
      method: 'POST',
      headers: { 'Coontent-Type': 'aplication/json' },
      body: JSON.stringify({ task: taskText, Time:timeText })
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
  const Li = document.createElement('Li');
  Li.innerHTML = `${task.task} $[task.time] <button class="delete-btn" onclick="deleteTask(${task.id}),this.parentElement)">Delete</button>`;
  taskList.appendChild(li);
}
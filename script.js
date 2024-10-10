let tasks = [];

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskTitle = document.getElementById('task-title').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskStatus = document.querySelector('input[name="status"]:checked').value;

      // Create a task object
      const task = {
        title: taskTitle,
        priority: taskPriority,
        status: taskStatus
    };

    // Add task to the array
    tasks.push(task);

    // Update the DOM
    addTaskToDOM(task, tasks.length - 1);

    // Reset form
    document.getElementById('task-form').reset();
});
// Function to add a task to the DOM
function addTaskToDOM(task, index) {
    const taskList = document.getElementById('task-list');
    
    const taskItem = document.createElement('div');
    taskItem.classList.add('col-md-4', 'mb-4');
    taskItem.innerHTML = `
        <div class="card p-3 shadow-sm">
            <div class="card-body">
                <h5 class="card-title ${task.status === 'Completed' ? 'completed' : ''}">${task.title}</h5>
                <p class="card-text">Priority: ${task.priority}</p>
                <div>
                    <button class="btn btn-success btn-sm" onclick="markTaskComplete(${index})">Complete</button>
                    <button class="btn btn-danger btn-sm" onclick="removeTask(${index})">Remove</button>
                </div>
            </div>
        </div>
    `;
    taskList.appendChild(taskItem);
}


    // Create a list item for the task
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    taskItem.innerHTML = `
        <span class="${task.status === 'Completed' ? 'completed' : ''}">${task.title} - ${task.priority} Priority</span>
        <div>
            <button class="btn btn-success btn-sm" onclick="markTaskComplete(${index})">Complete</button>
            <button class="btn btn-danger btn-sm" onclick="removeTask(${index})">Remove</button>
        </div>
    `;

    // Append to task list
    taskList.appendChild(taskItem);

// Function to remove a task
function removeTask(index) {
    tasks.splice(index, 1); // Remove task from the array
    updateDOM(); // Update DOM to reflect changes
}

// Function to mark a task as complete
function markTaskComplete(index) {
    tasks[index].status = 'Completed'; // Update task status in the array
    updateDOM(); // Update DOM to reflect changes
}
// Function to update the DOM
function updateDOM() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the task list

    // Rebuild the task list from the array
    tasks.forEach((task, index) => {
        addTaskToDOM(task, index);
    });
}
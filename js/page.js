// Select the add task button
const addTaskBtn = document.getElementById('add-task-btn');

// Select the todo container
const todoContainer = document.getElementById('todo-container');

// Add event listener to the add task button
addTaskBtn.addEventListener('click', () => {
    // Create a new task element
    const newTask = document.createElement('div');
    newTask.classList.add('task');

    // Define the HTML content for the new task element
    newTask.innerHTML = `
        <div class='task__buttons'>
            <!-- Buttons -->
            <div class="status">
                <button class="defined">
                    <span>defined</span>
                </button>
                <button class="in-progress">
                    <span>In progress</span>
                </button>
                <button class="done">
                    <span>Done</span>
                </button>
            </div>
            <input type="date" class="task__date">
        </div>
        <div class='task__details'>
            <!-- Task details -->
            <input type="text" class="task__title" value="Title">
            <textarea class="task__text" rows="4">Task details go here...</textarea>
        </div>
        <div class="task__buttons">
            <div class="task_change">
                <button class="delete">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                </button>

                <button class="edit">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
            </div>
        </div>
    `;

    // Append the new task element to the todo container
    todoContainer.appendChild(newTask);
});

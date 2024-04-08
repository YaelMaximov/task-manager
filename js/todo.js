const todoList1 = [
    {
        idTodo: 1,
        title: 'make dinner',
        status: "Defined",
        date: '2022-12-22',
        comments: "hello"
    }, 
    {
        idTodo: 2,
        title: 'clean house',
        status: "In Progress",
        date: '2022-12-22',
        comments: "hello"
    }
]; 
// render tasks
renderTodoList();

function renderTodoList() {
    let todoListHTML = '';
    // TODO - GET make get request for all
    // TODO - focus on inputs should be false
    for (let i = 0; i < todoList1.length; i++) {
        const todoObject = todoList1[i];
        const { idTodo, title, status, date, comments } = todoObject;
        /**
         * colors:
         * 1. defined
         * 2. in
         * 3. done
         * 4. none
         */
        const color = status === "Defined" ? "defined-border" : status === "In Progress"? "in-progress-border" : status === "Done"? "sone-border" : "";
        const html = `
            <div class="task" id="${color}">
                <div class='task__buttons'>
                    <!-- Buttons -->
                    <div class="status">
                        <button class="defined" title="defined" onclick="taskIsDefined()">
                            <span class="material-symbols-outlined">
                                checkbook
                            </span>
                        </button>
                        <button class="in-progress" title="in-progress" onclick="taskInProgress()"> 
                            <span class="material-symbols-outlined">
                                network_check
                            </span>
                        </button>
                        <button class="done" title="done" onclick="taskDone()">
                            <span class="material-symbols-outlined">
                                done
                            </span>
                        </button>
                    </div>
                </div>
                <div class='task__details'>
                    <!-- Task details -->
                    <input type="text" class="task__title" placeholder="Title" value="${title}">
                    <input type="date" class="task__date" value="${date}">
                    <textarea class="task__text" rows="4">Task details go here...</textarea value="${comments}">
                </div>
                <div class="task__buttons">
                    <div class="task_change">
                        <button class="delete" onclick="deleteTask()">
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                            <!-- <span>delete</span> -->
                        </button>
        
                        <button class="edit" onclick="editTask()">
                            <span class="material-symbols-outlined">
                                edit
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        `;        
        todoListHTML += html;
    }

    document.querySelector('.todo-container')
        .innerHTML = todoListHTML;
}

function displayTaskTemplate() {
    const html = `
        <div class="task" id="">
            <div class='task__buttons'>
                <!-- Buttons -->
                <div class="status">
                    <button class="defined" title="defined" onclick="taskIsDefined()">
                        <span class="material-symbols-outlined">
                            checkbook
                        </span>
                    </button>
                    <button class="in-progress" title="in-progress" onclick="taskInProgress()"> 
                        <span class="material-symbols-outlined">
                            network_check
                        </span>
                    </button>
                    <button class="done" title="done" onclick="taskDone()">
                        <span class="material-symbols-outlined">
                            done
                        </span>
                    </button>
                </div>
            </div>
            <div class='task__details'>
                <!-- Task details -->
                <input type="text" class="task__title" placeholder="Title" value="">
                <input type="date" class="task__date" value="">
                <textarea class="task__text" rows="4">Task details go here...</textarea value="">
            </div>
            <div class="task__buttons">
                <div class="task_change">
                    <button class="delete" onclick="deleteTask()">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                        <!-- <span>delete</span> -->
                    </button>

                    <button class="edit" onclick="editTask()">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.todo-container').innerHTML += html;
}


// event listener - delete task
function deleteTask() {

}
// event listener - edit task
function editTask() {
    // at the end, send PUT to DB
}

// for individual tasks:
// event listener - click defined
function taskDefined() {

}
// event listener - click inprogress
function taskInProgress() {

}
// event listener - click done
function taskDone() {

}

// filters:
// filter all defined
// filter all in progress
// filter all done

// TODO - onload call render which calls GET for all todos of user using FXML object
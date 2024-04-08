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
document.addEventListener('DOMContentLoaded', function() {
    let xhr = new FXMLHttpRequest();
    let url = "getAllTodos";
    xhr.open('GET', `https://client/${url}`);
    xhr.addEventListener('load', (response) => {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200){
            todoList1=xhr.responseText;
        }
        else if(xhr.readyState === 4 && xhr.status === 409){
            document.getElementById('error-todo').textContent = "Todo list not found";

        }

    });
    xhr.send("");
});



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
                <input type="text" class="task__title" placeholder="Title" value="" required>
                <input type="date" class="task__date" value="" required>
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
function taskIsDefined() {
    let xhr = new FXMLHttpRequest();
    let url = "addTodo";
    let titleV=document.getElementById('task__title').value;
    let dateV=document.getElementById('task__date').value;
    let commentsV=document.getElementById('task__text').value;

    xhr.open('POST', `https://client/${url}`);
    let task=  {
        idTodo: NaN ,
        title: titleV,
        status: "Defined",
        date: dateV,
        comments: commentsV
    }
    xhr.addEventListener('load', (response) => {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200){
            todoList1.push(task);
            titleV.disabled=true;
            dateV.disabled=true;
            commentsV.disabled=true;
        }
        else if(xhr.readyState === 4 && xhr.status === 401){
            document.getElementById('error-todo').textContent = xhr.statusText;

        }
    });
    xhr.send(task);



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
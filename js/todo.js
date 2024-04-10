


var todoList1 = [];
renderTodoList();

function getAllTodos() {
    let xhr = new FXMLHttpRequest();
    let url = "getAllTodos";
    xhr.open('GET', `https://client/${url}`);
    xhr.addEventListener('load', (response) => {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            todoList1 = xhr.responseText;
        }
        else if (xhr.readyState === 4 ) {
            alert(xhr.statusText);

        }

    });
    xhr.send("");
};

// render tasks
function renderTodoList() {
    getAllTodos();
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
        const color = status === "Defined" ? "defined-border" : status === "In Progress" ? "in-progress-border" : status === "Done" ? "sone-border" : "";
        const html = `
            <div class="task id_${idTodo}" id="${color}">
                <div class='task__buttons'>
                    <!-- Buttons -->
                    <div class="status">
                        <button class="defined" title="defined" onclick="taskIsDefined()">
                            <span class="material-symbols-outlined">
                                checkbook
                            </span>
                        </button>
                        <button class="in-progress" title="in-progress" onclick="taskInProgress(${idTodo})"> 
                            <span class="material-symbols-outlined">
                                network_check
                            </span>
                        </button>
                        <button class="done" title="done" onclick="taskDone(${idTodo})">
                            <span class="material-symbols-outlined">
                                done
                            </span>
                        </button>
                    </div>
                </div>
                <div class='task__details'>
                <div class="task__buttons task_change">
                <button class="delete" onclick="deleteTask(${idTodo})">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                    <!-- <span>delete</span> -->
                </button>

                <button class="edit" onclick="openEdit(${idTodo})">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
                <button class="edited ok" title="save changes" onclick="editTask(${idTodo},'${status}')"><span class="material-symbols-outlined">
                check_circle
                </span></button>
                <button class="edited cancel" title="cancle" onclick="renderTodoList()"><span class="material-symbols-outlined">
                cancel
                </span></button>
                </div>
                    <!-- Task details -->
                    <input type="text" class="task__title" placeholder="Title" disabled value="${title}">
                    <input type="date" class="task__date" disabled value="${date}">
                    <textarea class="task__text" rows="4" disabled>${comments}</textarea value="">
                </div>
            </div>
        `;
        todoListHTML += html;
    }

    document.querySelector('.todo-container')
        .innerHTML = todoListHTML;
}

function displayTaskTemplate() {
    let addBtn = document.querySelector(".add-task-btn");
    addBtn.disabled = true;
    const html = `
        <div class="task current " >
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
            <div class="task__buttons task_change">
            <button title="delete" class="delete" onclick="deleteTask()">
                <span class="material-symbols-outlined">
                    delete
                </span>
                <!-- <span>delete</span> -->
            </button>

            <button title="edit" class="edit" onclick="openEdit()">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button>
            <button class="edited ok" title="save changes" onclick="editTask()"><span class="material-symbols-outlined">
            check_circle
            </span></button>
            <button class="edited cancel" title="cancle" ><span class="material-symbols-outlined">
            cancel
            </span></button>
            </div>
                <!-- Task details -->
                <input type="text" class="task__title" placeholder="Title" value="" required>
                <input type="date" class="task__date" value="" required>
                <textarea class="task__text" rows="4" title="Task details go here..."></textarea value="">
            </div>
          
        </div>
    `;
    document.querySelector('.todo-container').innerHTML += html;
}


// event listener - delete task
function deleteTask(taskIndex) {
    console.log(taskIndex);
    let xhr = new FXMLHttpRequest();
    let url = "deleteTodo";
    xhr.open('DELETE', `https://client/${url}`);
    xhr.addEventListener('load', (response) => {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            renderTodoList();
        }
        else if(xhr.readyState === 4){
            alert(xhr.statusText);

        }
    });
    xhr.send(taskIndex);

}
// event listener - edit task
function openEdit(taskIndex) {
    // at the end, send PUT to DB
    console.log(taskIndex);
    let className = ".id_" + taskIndex;
    let findClass = document.querySelector(className);
    let titleV = findClass.querySelector(".task__title");
    let dateV = findClass.querySelector(".task__date");
    let commentsV = findClass.querySelector(".task__text");
    let hiddenBtn = findClass.querySelectorAll(".edited");
    titleV.disabled = false;
    dateV.disabled = false;
    commentsV.disabled = false;
    hiddenBtn[0].style.visibility = "visible";
    hiddenBtn[1].style.visibility = "visible";

}

function editTask(taskIndex, status) {
    let className = ".id_" + taskIndex;
    let findClass = document.querySelector(className);
    let xhr = new FXMLHttpRequest();
    let url = "updateTodo";
    let titleV = findClass.querySelector(".task__title").value;
    let dateV = findClass.querySelector(".task__date").value;
    let commentsV = findClass.querySelector(".task__text").value;


    xhr.open('PUT', `https://client/${url}`);
    let task = {
        idTodo: taskIndex,
        title: titleV,
        status: status,
        date: dateV,
        comments: commentsV
    }
    xhr.addEventListener('load', (response) => {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            renderTodoList();
        }
        else if (xhr.readyState === 4) {
            alert(xhr.statusText);
        }
    });
    xhr.send(task);

}

// for individual tasks:
// event listener - click defined
function taskIsDefined() {
    let addBtn = document.querySelector(".add-task-btn");
    addBtn.disabled = false;
    let findClass = document.querySelector(".current");
    if (findClass) {
        let xhr = new FXMLHttpRequest();
        let url = "addTodo";
        let titleV = findClass.querySelector(".task__title").value;
        let dateV = findClass.querySelector(".task__date").value;
        let commentsV = findClass.querySelector(".task__text").value;

        xhr.open('POST', `https://client/${url}`);
        let task = {
            idTodo: todoList1.length + 1,
            title: titleV,
            status: "Defined",
            date: dateV,
            comments: commentsV
        }
        xhr.addEventListener('load', (response) => {
            console.log(xhr.responseText);
            if (xhr.readyState === 4 && xhr.status === 200) {
                todoList1.push(task);
                findClass.classList.remove('current');
                renderTodoList();
            }
            else if (xhr.readyState === 4) {
                alert(xhr.statusText);

            }
        });
        xhr.send(task);

    }

}
// event listener - click inprogress
function taskInProgress(taskIndex) {
    let className = ".id_" + taskIndex;
    let findClass = document.querySelector(className);
    let xhr = new FXMLHttpRequest();
    let url = "updateTodo";
    let titleV = findClass.querySelector(".task__title").value;
    let dateV = findClass.querySelector(".task__date").value;
    let commentsV = findClass.querySelector(".task__text").value;


    xhr.open('PUT', `https://client/${url}`);
    let task = {
        idTodo: taskIndex,
        title: titleV,
        status: "In Progress",
        date: dateV,
        comments: commentsV
    }
    xhr.addEventListener('load', (response) => {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            renderTodoList();
        }
        else if (xhr.readyState === 4) {
            alert(xhr.statusText);

        }
    });
    xhr.send(task);

}
// event listener - click done
function taskDone(taskIndex) {
    let className = ".id_" + taskIndex;
    let findClass = document.querySelector(className);
    let xhr = new FXMLHttpRequest();
    let url = "updateTodo";
    let titleV = findClass.querySelector(".task__title").value;
    let dateV = findClass.querySelector(".task__date").value;
    let commentsV = findClass.querySelector(".task__text").value;


    xhr.open('PUT', `https://client/${url}`);
    let task = {
        idTodo: taskIndex,
        title: titleV,
        status: "Done",
        date: dateV,
        comments: commentsV
    }
    xhr.addEventListener('load', (response) => {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            renderTodoList();
        }
        else if (xhr.readyState === 4) {
            alert(xhr.statusText);

        }
    });
    xhr.send(task);

}

// filters:
// filter all defined
// filter all in progress
// filter all done

// TODO - onload call render which calls GET for all todos of user using FXML object
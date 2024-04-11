// ----------------------- display username -------------------------
var todoList1 = [];
var unfiltered=true;
var filteKey;
var filteValue;

renderTodoList();
// render tasks-can render tasks by filter
function renderTodoList() {
    // let filterBtns = document.querySelectorAll(".filter-btn");
    // filterBtns.forEach(btn => { btn.disabled = false; });
    let username = document.querySelector(".username-display").textContent;
    if (!username) {
        let xhr = new FXMLHttpRequest();
        const url = "getCurrentUser"
        xhr.open('GET', `https://client/${url}`);
        xhr.addEventListener('load', (response) => {
            console.log(xhr.responseText);
            if (xhr.readyState === 4 && xhr.status === 200) {
                username = xhr.responseText;   
                document.querySelector(".username-display").textContent = username;
            }
            else if (xhr.readyState === 4 ) {
                alert(xhr.statusText);
            }
        });
        xhr.send("");
    }
    let otherBtns = document.querySelectorAll(".btn_disable");
    otherBtns.forEach(btn => { btn.disabled = false; });
    if(unfiltered)
    {
        let addBtn = document.querySelector(".add-task-btn");
        addBtn.style.visibility = "visible";
        getAllTodos();
    }
    else{
        filterByKey(filteKey,filteValue);
    }
    let todoListHTML = '';
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
        const color = status === "Defined" ? "defined-border" : status === "In Progress" ? "in-progress-border" : status === "Done" ? "done-border" : "";
        const html = `
            <div class="task id_${idTodo}" id="${color}" >
                <div class='task__buttons'>
                    <!-- Buttons -->
                    <div class="status">
                        <button class="defined btn_disable" title="defined" onclick="taskIsDefined()">
                            <span class="material-symbols-outlined">
                                checkbook
                            </span>
                        </button>
                        <button class="in-progress btn_disable" title="in-progress" onclick="taskInProgress(${idTodo})"> 
                            <span class="material-symbols-outlined">
                                network_check
                            </span>
                        </button>
                        <button class="done btn_disable" title="done" onclick="taskDone(${idTodo})">
                            <span class="material-symbols-outlined">
                                done
                            </span>
                        </button>
                    </div>
                </div>
                <div class='task__details'>
                <div class="task__buttons task_change">
                <button class="delete btn_disable" style="visibility: visible" onclick="deleteTask(${idTodo})">
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                    <!-- <span>delete</span> -->
                </button>

                <button class="edit btn_disable" style="visibility: visible"  onclick="openEdit(${idTodo})">
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
                <button class="edited ok btn_disable" title="save changes" onclick="editTask(${idTodo},'${status}')"><span class="material-symbols-outlined">
                check_circle
                </span></button>
                <button class="edited cancel btn_disable" title="cancle" onclick="renderTodoList()"><span class="material-symbols-outlined">
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

//------------------add task functions--------------------/
function displayTaskTemplate() {
    let otherBtns = document.querySelectorAll(".btn_disable");
    otherBtns.forEach(btn => { btn.disabled = true; });
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
            <button title="delete" style="visibility: hidden" class="delete" onclick="deleteTask()">
                <span class="material-symbols-outlined">
                    delete
                </span>
                <!-- <span>delete</span> -->
            </button>

            <button title="edit" style="visibility: hidden" class="edit" onclick="openEdit()">
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
                <input type="text" class="task__title inputs" placeholder="Title" value="" required>
                <input type="date" class="task__date inputs" value="" required>
                <textarea class="task__text inputs" rows="4" title="Task details go here..."></textarea value="">
            </div>
          
        </div>
    `;
    document.querySelector('.todo-container').innerHTML += html;
}
// for individual tasks:
// event listener - click defined
function taskIsDefined() {
    let findClass = document.querySelector(".current");
    if (findClass) {
        let inputs = findClass.querySelector(".inputs").checkValidity();
        if(!inputs){
            alert("type inputs before save");
            return;
        }
        let xhr = new FXMLHttpRequest();
        let url = "addTodo";
        let titleV = findClass.querySelector(".task__title").value;
        let dateV = findClass.querySelector(".task__date").value;
        let commentsV = findClass.querySelector(".task__text").value;
        let maxId=0;
        if(todoList1.length>0)
        {
            let list=todoList1.map(task => task.idTodo);
            maxId=Math.max(...list);
        }
       

        xhr.open('POST', `https://client/${url}`);
        let task = {
            idTodo: maxId+1,
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



//------------------get all tasks---------------------------/
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



//------------------filter tasks function------------------/
function filterByKey(key,value){
    let xhr = new FXMLHttpRequest();
    let url = "getTodoByKey";
    xhr.open('GET', `https://client/${url}`);
    // let filter=[key,value];
    xhr.addEventListener('load', (response) => {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            todoList1 = xhr.responseText;
            // temp = xhr.responseText;
            // let todoTemp=[];
            // console.log(temp);
            // todoList1.forEach(task => temp.forEach(t => {
            //     if(task.idTodo===t.idTodo){
            //         todoTemp.push(task);
            //     }
            // }));
            // todoList1=todoTemp;
            // console.log(todoList1);
            let addBtn = document.querySelector(".add-task-btn");
            if(key="date"){
                let dateBtn = document.querySelector(".date-filter");
                dateBtn.value="";
            }
            if(value!="Defined")
            { 
                addBtn.style.visibility = "hidden";
            }
            else{
                addBtn.style.visibility = "visible";
            }
        }
        else if (xhr.readyState === 4) {
            alert(xhr.statusText);

        }
    });
    xhr.send([key,value]);
}
function setFilter(key,value,on_off)
{
    filteKey=key;
    filteValue=value;
    unfiltered=on_off;
    renderTodoList();
}

//------------------delete task function------------------/
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

//-----------------edit task functions-------------------/
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


//-----------------status handle-------------------------------/

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



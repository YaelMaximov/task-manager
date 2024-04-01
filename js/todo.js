const todoList1 = [
    {
        name: 'make dinner',
        dueDate: '2022-12-22'
    }, 
    {
        name: 'wash dishes',
        dueDate: '2022-12-22'
    }
]; 
renderTodoList();

function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList1.length; i++) {
        const todoObject = todoList1[i];
        const { name, dueDate } = todoObject;
        const html = `
            <div>${name}</div> 
            <div>${dueDate}</div> 
            <button onclick="
                todoList.splice(${i}, 1);
                renderTodoList();
            " class="delete-todo-button"
            >Delete</button>
        `;
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list')
        .innerHTML = todoListHTML;
}

function addTodo() {
    const inputElem = document.querySelector('.js-name-input')
    const name = inputElem.value;

    const dateInputElem = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElem.value;

    todoList1.push(
        {
            name,
            dueDate
        } 
    );

    inputElem.value = '';

    renderTodoList();
}
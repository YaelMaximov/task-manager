class DataBase {
    constructor() {
        let todoCounter = 1;
    }

    /**
     * GET
     * Check if user exists in the DB
     * @param {*} username we want to check / find id exists
     * @returns whether the user exists or not
     */
    userExist(username) {
        userList = JSON.parse(localStorage.getItem(users));
        return (userList.includes(username))? true: false;
    }

    /**
     * POST
     * @param {*} newUser new user that needs to be added to the DataBase
     */
    signUp(newUser) {
        // Retrieve existing user list from local storage
        let usersInfoJSON = localStorage.getItem('usersInfo');
        let usersInfo = [];

        if (userListJSON) {
            // If user list exists in local storage, parse it
            usersInfo = JSON.parse(usersInfoJSON);
        }

        // Add the new user to the user list
        usersInfo.push(newUser);

        // Save the updated user list back to local storage
        localStorage.setItem('usersInfo', JSON.stringify(usersInfo));

    }

    //Post
    /**
     * 
     * @param {*} username 
     * @param {*} newTodo 
     * @returns 
     */
    addTodo(username, newTodo) {
        // Retrieve userInfo from local storage
        const usersInfoJSON = localStorage.getItem('usersInfo');

        if (!usersInfoJSON) {
            console.log("User info not found.");
            return;
        }

        // Parse the userInfo JSON
        let usersInfo = JSON.parse(usersInfoJSON);

        // Find the user with the given username
        const userIndex = usersInfo.findIndex(user => user.username === username);

        if (userIndex === -1) {
            console.log("User not found.");
            return;
        }
        // Generate the unique idTodo using the counter
        const idTodo = todoCounter++;

        // Add the new todo to the user's todo array
        usersInfo[userIndex].todo.push(newTodo);
        // Update userInfo in local storage
        localStorage.setItem('usersInfo', JSON.stringify(usersInfo));
    }

    //Get
    /**
     * 
     * @param {*} username 
     * @returns 
     */
    logIn_getAllTodo(username) {
        // Retrieve the user list from local storage
        const usersInfoJSON = localStorage.getItem('usersInfo');

        if (!usersInfoJSON) {
            console.log("User list not found.");
            return [];
        }

        // Parse the user list JSON
        const usersInfo = JSON.parse(usersInfoJSON);

        // Find the user with the given username
        const user = usersInfo.find(user => user.username === username);

        if (!user) {
            console.log("User not found.");
            return [];
        }

        // Return the todo list of the user
        return user.todo;

    }

    /**
     * 
     * @param {*} username 
     * @param {*} key 
     * @param {*} value 
     * @returns 
     */
    getTodoByKey(username, key, value) {
        // Retrieve userInfo from local storage
        const usersInfoJSON = localStorage.getItem('usersInfo');

        if (!usersInfoJSON) {
            console.log("User info not found.");
            return [];
        }

        // Parse the userInfo JSON
        const usersInfo = JSON.parse(usersInfoJSON);

        // Find the user with the given username
        const user = usersInfo.find(user => user.username === username);

        if (!user) {
            console.log("User not found.");
            return [];
        }

        // Filter todos based on the provided key and value
        const filteredTodos = user.todo.filter(todo => todo[key] === value);

        return filteredTodos;
    }
    
    /**
     * Function to update a todo by id
     * @param {*} username 
     * @param {*} idTodo 
     * @param {*} updatedTodo 
     * @returns 
     */
    updateTodo(username, idTodo, updatedTodo) {
        // Retrieve userInfo from local storage
        const usersInfoJSON = localStorage.getItem('usersInfo');

        if (!usersInfoJSON) {
            console.log("User info not found.");
            return false;
        }

        // Parse the userInfo JSON
        let usersInfo = JSON.parse(usersInfoJSON);

        // Find the user with the given username
        const user = usersInfo.find(user => user.username === username);

        if (!user) {
            console.log("User not found.");
            return false;
        }

        // Find the todo with the given idTodo
        const todoIndex = user.todo.findIndex(todo => todo.idTodo === idTodo);

        if (todoIndex === -1) {
            console.log("Todo not found.");
            return false;
        }

        // Update the todo with the provided updatedTodo
        user.todo[todoIndex] = { ...user.todo[todoIndex], ...updatedTodo };

        // Update userInfo in local storage
        localStorage.setItem('usersInfo', JSON.stringify(usersInfo));

        return true;
    }

    /**
     * Function to delete a todo by id
     * @param {*} username 
     * @param {*} idTodo 
     * @returns 
     */
    deleteTodo(username, idTodo) {
        // Retrieve userInfo from local storage
        const usersInfoJSON = localStorage.getItem('usersInfo');

        if (!usersInfoJSON) {
            console.log("User info not found.");
            return false;
        }

        // Parse the userInfo JSON
        let usersInfo = JSON.parse(usersInfoJSON);

        // Find the user with the given username
        const user = usersInfo.find(user => user.username === username);

        if (!user) {
            console.log("User not found.");
            return false;
        }

        // Find the todo with the given idTodo
        const todoIndex = user.todo.findIndex(todo => todo.idTodo === idTodo);

        if (todoIndex === -1) {
            console.log("Todo not found.");
            return false;
        }

        // Remove the todo from the user's todo array
        user.todo.splice(todoIndex, 1);

        // Update userInfo in local storage
        localStorage.setItem('usersInfo', JSON.stringify(usersInfo));

        return true;
    }

}
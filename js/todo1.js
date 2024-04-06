const handleResponse = (callback) => {
    const request= new FXMLHttpRequest();

    request.addEventListener('readystatechange',()=>
    {
        if(request.readyState === 4 && request.status === 200){
            callback(); 
        }
        else if(request.readyState === 4 && request.status === 404){
            callback();
        }
        else if(request.readyState === 4 && request.status === 403){
            callback();
        }
    });

    request.open('GET',);
    request.send();
}
    //Get-async
    logIn_getAllTodo(username) {


    }

    //Get-async
    getTodoByKey(username, key, value) {

    }

    // Put-sync
    updateTodo(username, idTodo, updatedTodo) {

    }

    // Delete-sync
    deleteTodo(username, idTodo) {

    }
class Server {
    /**
     * Constructor for Server class
     * @var dateBase All the information for our project
     * @var response The appropraite returned value for every request type
     */
    constructor() {
        this.dateBase = new DataBase();
        this.response = null;
    }

    /**
     * Sends our request to the appropriate function
     * @param {*} method type of request (GET/ POST/ PUT/ DELETE)
     * @param {*} req location for operation
     * @returns resopnse to the request sent
     */
    methodRequest(method, req) {
        switch (method) {
            case 'GET':
                return this.get(req);
            case 'POST':
                return this.post(req);
            case 'PUT':
                return this.put(req);
            case 'DELETE':
                return this.delete(req);
            default:
                break;
        }
    }

    /**
     * POST requests:
     *  1. sign up
     *  2. sign in
     *  3. adding a todo (task) to the database for a single user (current user)
     * @param {*} req sent to us
     * @returns response generated for the request sent
     */
    post(req) {
        req.readyState = 3; // processing req
        if (checkWhatUrl(req.url) === 'signUp') {
            if (req.data) {
                // data=user object
                if (!this.dateBase.userExist(req.data.username)) {
                    this.dateBase.signUp(req.data);
                    req.status = 200;
                    req.statusText = "OK";
                } else {
                    req.status = 409;
                    req.statusText = "Conflict";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            // req.readyState = 4; // finished 
            // return req;
        }
        else if (checkWhatUrl(req.url) === 'login') {
            if (req.data) {
                //data=[username, psw]
                // 1. if user doesn't exist
                // 2. psw not correct
                if (this.dateBase.userExist(req.data[0])) {
                    if (this.dateBase.checkPsw(req.data)) {
                        this.response = this.dateBase.login(req.data[0]);
                        req.status = 200;
                        req.statusText = "OK";
                    } else {
                        req.status = 401;
                        req.statusText = "Unauthorized";
                    }
                } else {
                    req.status = 409;
                    req.statusText = "Conflict";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            // req.readyState = 4; // finished
            // return req;
        }
        else if (checkWhatUrl(req.url) === 'addTodo') {
            if (req.data) {
                //data=Todo (task) object
                this.response = this.dateBase.addTodo(req.data);
                if (this.response) {
                    req.status = 200;
                    req.statusText = "OK";
                }
                else {
                    req.status = 401;
                    req.statusText = "Unauthorized";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            // req.readyState = 4; // finished
            // return req;
        }
        else { // incorrect url 
            req.status = 404;
            req.statusText = "Not Found";
        }
        req.readyState = 4; // finished
        return req;
    }

    /**
     * GET requests:
     *  1. check if the user exists
     *  2. retrieve all the todos for the current user
     *  3. retrieve specific todo
     * @param {*} req sent to us
     * @returns response generated for the request sent
     */
    get(req) {
        req.readyState = 3; // processing req
        if (checkWhatUrl(req.url) === 'userExist') {
            // TODO - See if we need to keep userExist methods / checks
            // if (req.data) {
            //     //data=username
            //     response = dateBase.userExist(req.data);
            //     req.status = 200;
            //     req.statusText = "OK";
            //     req.responseText = response;
            // }
            // else {
            //     req.status = 400;
            //     req.statusText = "Bad Request";
            // }
            // req.readyState = 4; // finished
            // return req;
        }
        else if (checkWhatUrl(req.url) === 'getAllTodos') {
            this.response  = this.dateBase.getAllTodos();
            //|| this.response == []
            if (this.response ) {
                // TODO - check that this only works when response is an empty array [] or has todos inside it
                req.status = 200;
                req.statusText = "OK";
                req.responseText = this.response;
            }
            else {
                req.status = 401;
                req.statusText = "Unauthorized";
            }
            // req.readyState = 4; // finished
            // return req;
        }
        else if (checkWhatUrl(req.url) === 'getTodoByKey') {
            if (req.data) {
                //data=[key, value]
                // key - attribute in a task (date, status...)
                // value - specific instance of key
                this.response  = this.dateBase.getTodoByKey(req.data);
                if (this.response) {
                    req.status = 200;
                    req.statusText = "OK";
                    req.responseText = this.response;
                    // TODO - look at returned filtered todo list in console
                    console.log(this.response); 
                }
                else {
                    req.status = 401;
                    req.statusText = "Unauthorized";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            // req.readyState = 4; // finished
            // return req;
        }
        else {
            req.status = 404;
            req.statusText = "Not Found";
        }
        req.readyState = 4; // finished
        return req;
    }

    /**
     * PUT request:
     * update a specific todo (task) information
     * @param {*} req sent to us
     * @returns response generated for the request sent
     */
    put(req) {
        req.readyState = 3; // processing req
        if (checkWhatUrl(req.url) === 'updateTodo') {
            if (req.data) {
                // data=updated todo object,it will find the idTodo from the object
                this.response  = this.dateBase.updateTodo(req.data);
                if (this.response) {
                    // req.readyState = 4;
                    if (this.response === "todo id not found") {
                        req.status = 404;
                        req.statusText = "Not Found";
                    } else {
                        req.status = 200;
                        req.statusText = "OK";
                    }
                }
                else {
                    req.status = 401;
                    req.statusText = "Unauthorized";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            // req.readyState = 4; // finished
            // return req;
        }
        else {
            req.status = 404;
            req.statusText = "Not Found";
        }
        req.readyState = 4; // finished
        return req;
    }

    /**
     * DELETE request:
     * delete a todo (task) for the current user
     * @param {*} req sent to us
     * @returns response generated for the request sent
     */
    delete(req) {
        req.readyState = 3; // processing req
        if (checkWhatUrl(req.url) === 'deleteTodo') {
            if (req.data) {
                //data=the idTodo
                this.response  = this.dateBase.deleteTodo(req.data);
                if (this.response) {
                    // req.readyState = 4;
                    if (this.response === "todo id not found") {
                        req.status = 404;
                        req.statusText = "Not Found";
                    } else {
                        req.status = 200;
                        req.statusText = "OK";
                    }
                }
                else {
                    req.status = 401;
                    req.statusText = "Unathorized";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            // req.readyState = 4; // finished
            // return req;
        }
        else {
            req.status = 404;
            req.statusText = "Not Found";
        }
        req.readyState = 4; // finished
        return req;
    }
}

/**
 * Checks what our request is (inside a single type or request method, this will determine what we must return - specifically)
 * @param {*} url sent to the server
 * @returns the main value of what the url is requesting a response to
 */
function checkWhatUrl(url) {
    let arrUrl = url.split('/');
    return arrUrl[3];
}
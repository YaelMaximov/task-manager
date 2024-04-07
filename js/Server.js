class Server {
    constructor() {
        let dateBase = new DataBase();
        let response;
    }

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

    post(req) {
        req.readyState = 3;
        if (checkWhatUrl(req.url) === 'signUp') {
            if (req.data) {
                //data=user object
                response = dateBase.signUp(req.data);
                req.status = 200;
                req.statusText = "OK";
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            req.readyState = 4;
            return req;
        }
        else if (checkWhatUrl(request.url) === 'login') {
            if (req.data) {
                //data=username
                response = dateBase.login(req.data);
                req.status = 200;
                req.statusText = "OK";
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            req.readyState = 4;
            return req;
        }
        else if (checkWhatUrl(request.url) === 'addTodo') {
            if (req.data) {
                //data=Todo object
                response = dateBase.addTodo(req.data);
                if (response) {
                    req.status = 200;
                    req.statusText = "OK";
                }
                else {
                    req.status = 404;
                    req.statusText = "Not Found";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            req.readyState = 4;
            return req;
        }
        else {
            req.status = 404;
            req.statusText = "Not Found";
        }
        req.readyState = 4;
        return req;

    }

    get(req) {
        req.readyState = 3;
        if (checkWhatUrl(req.url) === 'userExist') {
            if (req.data) {
                //data=username
                response = dateBase.userExist(req.data);
                req.status = 200;
                req.statusText = "OK";
                req.responseText = response;
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            req.readyState = 4;
            return req;
        }
        else if (checkWhatUrl(req.url) === 'getAllTodos') {
            response = dateBase.getAllTodos();
            if (response) {
                req.status = 200;
                req.statusText = "OK";
                req.responseText = response;
            }
            else {
                request.status = 404;
                request.statusText = "Not Found";
            }
            req.readyState = 4;
            return req;
        }
        else if (checkWhatUrl(req.url) === 'getTodoByKey') {
            if (req.data) {
                //data=[key,value]
                response = dateBase.getTodoByKey(req.data);
                if (response) {
                    req.status = 200;
                    req.statusText = "OK";
                    req.responseText = response;
                }
                else {
                    request.status = 404;
                    request.statusText = "Not Found";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            req.readyState = 4;
            return req;
        }
        else {
            req.status = 404;
            req.statusText = "Not Found";
        }
        req.readyState = 4;
        return req;

    }

    put(req) {
        req.readyState = 3;
        if (checkWhatUrl(req.url) === 'updateTodo') {
            if (req.data) {
                //data=updated todo object,it will find the idTodo from the object
                response = dateBase.updateTodo(req.data);
                if (response) {
                    req.readyState = 4;
                    req.status = 200;
                    req.statusText = "OK";
                }
                else {
                    req.status = 404;
                    req.statusText = "Not Found";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            req.readyState = 4;
            return req;

        }
        else {
            req.status = 404;
            req.statusText = "Not Found";
        }
        req.readyState = 4;
        return req;

    }

    delete(req) {
        req.readyState = 3;
        if (checkWhatUrl(req.url) === 'deleteTodo') {
            if (req.data) {
                //data=the idTodo
                response = dateBase.deleteTodo(req.data.idTodo);
                if (response) {
                    req.readyState = 4;
                    req.status = 200;
                    req.statusText = "OK";
                }
                else {
                    req.status = 404;
                    req.statusText = "Not Found";
                }
            }
            else {
                req.status = 400;
                req.statusText = "Bad Request";
            }
            req.readyState = 4;
            return req;
        }
        else {
            req.status = 404;
            req.statusText = "Not Found";
        }
        req.readyState = 4;
        return req;
    }
}
function checkWhatUrl(url) {
    let arrUrl = url.split('/');
    return arrUrl[3];
}
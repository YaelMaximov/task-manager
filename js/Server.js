class Server {
    constructor() {}

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

    get(req) {
        
    }

    post(req) {

    }

    put(req) {

    }

    delete(req) {

    }
}
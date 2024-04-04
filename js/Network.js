
class network{
    server = new Server();

    sendToServer(method, request) {
        let response;
        response = server.methodRequest(method, request);
        return response;
    }
}
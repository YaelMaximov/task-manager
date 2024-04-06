
class network{
    server = new Server();

    sendToServer(method, request) {
        let newServer = new server();
        let response;
        response = newServer.methodRequest(method, request);
        return response;
    }
}

class Network {
    /**
     * Constructor for Network class
     * @var server The Server for the Network
     */
    constructor() {
        this.server = new Server();
    }

    /**
     * Send the FXML's request to the server through the Network
     * @param {*} method type of request to send the server (GET/ POST/ PUT/ DELETE)
     * @param {*} request location for request method (where to perform operations)
     * @returns the response to our request
     */
    sendToServer(method, request) {
        let response;
        response = newServer.methodRequest(method, request);
        return response;
    }
}

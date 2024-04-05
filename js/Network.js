class Network {
    /**
     * class constructor
     * created a new server
     * server is a private variable
     */ 
    constructor() {
        this._server = new Server(); 
    }
    /**
     * Sends info to server Asynchronously 
     * @param {*} data to send to server // TODO - needs to return a response
     * @param {*} dispatcher callback function
     * @returns response from server
     */
    send_to_server_async(data, dispatcher) { 
        this._server.prossess_data(data, dispatcher);
    }

    /**
     * Sends info to server Synchronously
     * @param {*} data to send to server 
     * @returns response
     */
    send_to_server(data) {
        let response = this._server.prossess_data(data);
        return response;
    }
}
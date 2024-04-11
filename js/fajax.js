class FXMLHttpRequest {
    /**
     * Constructor for FXMLHttpRequest class
     * @var readyState Holds status of FXML:
     *  0: req not initialized
     *  1: server connection established
     *  2: req received
     *  3: processing req
     *  4: req finished and res is ready
     * @var status Status-number of a req:
     *  200: "OK"
     *  400: "Bad Request"
     *  404: "Not Found"
     * @var statusText Returns the status-text (e.g. "OK" or "Not Found")
     * @var responseText Returns the res data as a string
     * @var onreadystatechange Defines a function to be called when the readyState property changes
     */
    constructor() {
        this.readyState = 0;
        this.status = 0;
        this.statusText = "";
        this.responseText = null;
        this.onreadystatechange = null;
    }

    /**
     * Specifies the request made
     * @param {*} method is the type of request (GET/ POST/ PUT/ DELETE)
     * @param {*} url is the file location
     */
    open(method, url) {
        this.method = method;
        this.url = url;
        this.readyState = 1;
    }

    /**
     * Send request to server (will be identified if it is GET or POST later on)
     * @param {*} obj to send to the sever (through Network)
     */
    send(obj) {
        this.data = obj;
        this.readyState = 2;
        const network = new Network();
        let response = network.sendToServer(this.method, this);
        //call the function that handles the response when the response is ready-callback
        this.onreadystatechange(response);
    }

    /**
     * There is a callback function that we get from the client code
     * @param {*} type 
     * @param {*} onreadystatechange 
     */
    addEventListener(type, onreadystatechange) {
        console.log(onreadystatechange);
        this.onreadystatechange = onreadystatechange;
    }
}
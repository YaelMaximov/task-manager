class FXMLHttpRequest {
    constructor() {
        this.readyState = 0;
        this.status = 0;
        this.statusText = "";
        this.responseText = null;
        this.onreadystatechange = null;
    }

    open(method, url) {
        this.method = method;
        this.url = url;
        this.readyState = 1;
    }

    send(obj) {
        this.data = obj;
        this.readyState = 2;
        const netWork = new Network();
        let response = netWork.sendToServer(this.method, this);
        //call the function that handles the response when the response is ready-callback
        this.onreadystatechange(response);
    }
    //there is a callback function that we get from the client code
    addEventListener(type, onreadystatechange) {
        console.log(onreadystatechange);
        this.onreadystatechange = onreadystatechange;
    }
}
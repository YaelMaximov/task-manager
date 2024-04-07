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
        else if(request.readyState === 4 && request.status === 400){
            callback();
        }
    });

    request.open('GET',);
    request.send();
    
}
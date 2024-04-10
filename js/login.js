var logInBtn=document.querySelector('#logInBtn');
logInBtn.addEventListener('click', login);

function login(e) {
    e.preventDefault();
    let form = document.getElementById('login');
    // checkValidity function that checks the inputs passed the conditions in the html
    let inputs=form.checkValidity();
    if(!inputs){
        //if their is a problem with the inputs do not continue
        form.reportValidity();
        return;
    }
    let usernameV = document.getElementById('username').value;
    let passwordV = document.getElementById('password').value;
    
    let xhr = new FXMLHttpRequest();
    let url = "login";
    xhr.open('POST', `https://client/${url}`);
    xhr.addEventListener('load', (response) => {
        console.log(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200){
            app.nav(e);
        }
        else if(xhr.readyState === 4 && xhr.status === 409){
            document.getElementById('error-login').textContent = "user does not exist";
        }
        else if(xhr.readyState === 4 && xhr.status === 401){
            document.getElementById('error-login').textContent = "wrong password";
        }

    });
    let data=[usernameV,passwordV] ;
    xhr.send(data);
}
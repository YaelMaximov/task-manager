document.querySelector('#signUpBtn').addEventListener('click', createUser);

function createUser(e) {
    e.preventDefault();
    let form = document.getElementById('signup-form');
    //checkValidity function that checks the inputs passed the conditions in the html
    let inputs = form.checkValidity();
    if (!inputs) {
        //if their is a problem with the inputs do not continue
        form.reportValidity();
        return;
    }

    let emailV = document.getElementById('email').value;
    let usernameV = document.getElementById('username').value;
    let passwordV = document.getElementById('password').value;
    let xhr = new FXMLHttpRequest();
    let url = "signUp"
    xhr.open('POST', `https://client/${url}`);

    //user object
    objUser = {
        username: usernameV,
        email: emailV,
        password: passwordV,
        todo: []
    }

    xhr.addEventListener('load', (response) => {
        console.log(response);
        //do something with the response...
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            app.nav(e);
        }
        else {
            console.log(xhr.status)
            document.getElementById('error-signup').textContent = "user already exist";
        }

    });
    xhr.send(objUser);
}
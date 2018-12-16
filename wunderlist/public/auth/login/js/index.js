const login = document.querySelector('#login');
const password = document.querySelector('#password');
const submit = document.querySelector('#register-submit');
const output = document.querySelector('#output');

const showOutput = () => {
    output.style.display = "block";
}

const showMessage = (message) => {
    showOutput();
    output.textContent = message;
}

const sendLogInfo = () => {
    const logIngo = {
        username: login.value,
        password: password.value
    }

    fetch('/auth/login/', {
        method: 'POST',
        body: JSON.stringify(logIngo),
        headers:{
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            if (res.redirected) {
                window.location.replace(res.url);
            } else {
                showMessage("Login or password is incorrect");
            }
        })
        .catch(error => console.error('Error:', error));
};

const validateInfo = () => {
    const pattern = new RegExp("^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,48}[a-zA-Z0-9]$");
    if (!pattern.test(login.value)) {
        showMessage('Invalid login. Rules: (Length from 6 to 50 characters, letters, digist, "_", "." are allowed)');
        return;
    }

    if (!pattern.test(password.value)) {
        showMessage('Invalid password. Rules: (Length from 6 to 50 characters, letters, digist, "_", "." are allowed)');
        return;
    }
    sendLogInfo();
}

submit.addEventListener('click', validateInfo);
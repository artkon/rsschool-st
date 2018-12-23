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

const sendUserInfo = () => {
    if (!validateInfo(login.value, password.value)) {
        return false;
    }

    const userIngo = {
        username: login.value,
        password: password.value
    }

    fetch('/auth/login/', {
        method: 'POST',
        body: JSON.stringify(userIngo),
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
    if (!pattern.test(login.value)) {
        showMessage('Invalid login. Rules: (Length from 6 to 50 characters, letters, digist, "_", "." are allowed)');
        return;
    }

    if (!pattern.test(password.value)) {
        showMessage('Invalid password. Rules: (Length from 6 to 50 characters, letters, digist, "_", "." are allowed)');
        return;
    }
    sendUserInfo();
}

submit.addEventListener('click', validateInfo);

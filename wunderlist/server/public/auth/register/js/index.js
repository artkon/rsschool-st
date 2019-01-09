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

const sendRegInfo = () => {
    // if (!validateInfo(login.value, password.value)) {
    //     return false;
    // }

    const regIngo = {
        username: login.value,
        password: password.value
    }

    fetch('/auth/register/', {
        method: 'POST',
        body: JSON.stringify(regIngo),
        headers:{
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            console.log('redirected?: ', res.redirected);
            if (res.redirected) {
                window.location.replace(res.url);
            } else {
                showMessage("This login is allready taken");
            }
        })
        .catch(error => console.error('Error:', error));
};

submit.addEventListener('click', sendRegInfo);

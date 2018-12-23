const validateInfo = (login, password) => {
    if (!pattern.test(login)) {
        showMessage('Invalid login. Rules: (Length from 6 to 50 characters, letters, digist, "_", "." are allowed)');
        return false;
    }

    if (!pattern.test(password)) {
        showMessage('Invalid password. Rules: (Length from 6 to 50 characters, letters, digist, "_", "." are allowed)');
        return false;
    }

    return true;
}

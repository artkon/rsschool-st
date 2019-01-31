import { USER_CREATE,
    USER_LOGIN,
    GET_USER, 
    USER_CHANGE_USERNAME, 
    USER_SUBMIT_USERNAME, 
    USER_DELETE 
} from '../actionTypes/user';


// CREATE_USER

const isValid = userInfo => {
    const pattern = new RegExp("^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,48}[a-zA-Z0-9]$");
    if (!pattern.test(userInfo.username)) {
        console.log('Invalid login!');
        console.log('Length from 6 to 50 characters, letters, digist, "_", "." are allowed');
        return false;
    }

    if (!pattern.test(userInfo.password)) {
        console.log('Invalid password!');
        console.log('Length from 6 to 50 characters, letters, digist, "_", "." are allowed');
        return false;
    }

    return true;
}

const fetchCreateUser = userInfo => {
    if(!isValid(userInfo)) {
        return;
    }

    return fetch('/auth/register/', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers:{
            'Content-Type': 'application/json'
        }});
}

export function createUser (user) {
    return {
        type: USER_CREATE,
        payload: {
            user
        }
    }
}

export function dispRegisterUser (userObj) {
    return async (dispatch) => {
        try {
            const res = await fetchCreateUser(userObj);
            const user = await res.json();
            dispatch(createUser(user));
        } catch {
            console.log('Not registered');
        }
    }
}


// USER_LOGIN

const fetchLoginUser = userInfo => {

    return fetch('/auth/login/', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers:{
            'Content-Type': 'application/json'
        }});
}

export function loginUser (user) {
    return {
        type: USER_LOGIN,
        payload: {
            user
        }
    }
}

export function dispLoginUser (userObj) {
    return async (dispatch) => {
        try {
            const res = await fetchLoginUser(userObj);
            const user = await res.json();
            dispatch(loginUser(user));
        } catch {
            console.log('Not loggined');
        }
    }
}


// GET USER

const fetchUser = () => {
    return fetch('/api/user/me')
}

export function getUser (user) {
    return {
        type: GET_USER,
        payload: {
            user
        }
    }
}

export function dispFetchUser () {
    return async (dispatch) => {
        const res = await fetchUser();
        const user = await res.json();
        dispatch(getUser(user));
    }
}

// USER_CHANGE_USERNAME

export function editUserName (username) {
    return {
        type: USER_CHANGE_USERNAME,
        payload: {
            username
        }
    }
}

export function dispEditUsername (username) {
    return async (dispatch) => {
        dispatch(editUserName(username));
    }
}


// USER_SUBMIT_USERNAME

const fetchSetUserName = (username) => {
    return fetch(`/api/user/me`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username })
    })
}

export function setUserName (username) {
    return {
        type: USER_SUBMIT_USERNAME,
        payload: {
            username
        }
    }
}

export function dispSetUsername (username) {
    return async (dispatch) => {
        await fetchSetUserName(username);
        dispatch(setUserName(username));
    }
}


// USER_DELETE

const fetchDeleteUser = () => {
    return fetch(`/api/user/me`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export function deleteUser () {
    return {
        type: USER_DELETE,
        payload: {}
    }
}

export function dispDeleteUser () {
    return async (dispatch) => {
        await fetchDeleteUser();
        dispatch(deleteUser());
    }
}

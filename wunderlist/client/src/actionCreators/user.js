import { GET_USER, 
    USER_CHANGE_USERNAME, 
    USER_SUBMIT_USERNAME, 
    USER_DELETE 
} from '../actionTypes/user';

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

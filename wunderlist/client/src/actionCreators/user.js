import { GET_USERNAME } from '../actionTypes/user';

const fetchUsername = () => {
    fetch('/api/username')
    .then(res => {
        return res.json()
    })
    .then(username => {
        return username;
    });
}

export function getUsername (username) {
    return {
        type: GET_USERNAME,
        payload: {
            username
        }
    }
}

export function dispFetchUsername () {
    return async (dispatch) => {
        const username = await fetchUsername();
        dispatch(getUsername(username));
    }
}

import { GET_USERNAME } from '../actionTypes/user';

const fetchUser = () => {
    return fetch('/api/user/me')
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
        const res = await fetchUser();
        const user = await res.json();
        const username = user.username || user.githubUserName;
        dispatch(getUsername(username));
    }
}

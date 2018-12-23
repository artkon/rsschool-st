import { GET_USERNAME } from '../actionTypes/user';
const defaultState = { usernname: '' };

export default function user (state = defaultState, action) {
    switch (action.type) {
        case GET_USERNAME:
            return { username: action.payload.username };
        default:
            return state;
    }
}

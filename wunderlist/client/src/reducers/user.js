import { USER_CREATE,
    USER_LOGIN,
    GET_USER, 
    USER_CHANGE_USERNAME, 
    USER_SUBMIT_USERNAME, 
    USER_DELETE 
} from '../actionTypes/user';

const defaultState = { usernname: '' };

export default function user (state = defaultState, action) {
    switch (action.type) {
        case USER_CREATE:
            return { username: action.payload.user.username, 
                userId: action.payload.user.userId };
        case USER_LOGIN:
            return { username: action.payload.user.username, 
                userId: action.payload.user.userId };
        case GET_USER:
            return { username: action.payload.user.username, 
                userId: action.payload.user.userId };
        case USER_CHANGE_USERNAME:
            return { username: action.payload.username };
        case USER_SUBMIT_USERNAME:
            return Object.assign({}, state);
        case USER_DELETE:
            return {};
        default:
            return state;
    }
}

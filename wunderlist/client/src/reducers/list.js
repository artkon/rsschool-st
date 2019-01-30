import { GET_LISTS,
    CREATE_LIST,
    LIST_EDIT,
    LIST_SUBMIT,
    LIST_DELETE 
} from '../actionTypes/list';

const defaultState = { list: [] };

export default function list (state = defaultState, action) {
    switch (action.type) {
        case GET_LISTS:
            return { lists: action.payload.lists };
        case CREATE_LIST:
            return { lists: [ ...state.lists, action.payload.list ] }
        case LIST_EDIT: {
            const id = parseInt(action.payload.list.id, 10);
            
            const targetList = state.lists.find((list) => {
                return list.id === id;
            });

            targetList.name = action.payload.list.name;

            const lists = state.lists.slice();

            return { lists };
        }
        case LIST_SUBMIT: {
            return Object.assign({}, state);
        }
        case LIST_DELETE: {
            return Object.assign({}, state);
        }
        default:
            return state;
    }
}

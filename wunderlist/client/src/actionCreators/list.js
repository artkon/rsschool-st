import { GET_LISTS, CREATE_LIST, LIST_EDIT, LIST_SUBMIT } from '../actionTypes/list';

// GET LISTS

const fetchLists = () => {
    return fetch('/api/lists')
}

export function getLists (lists) {
    return {
        type: GET_LISTS,
        payload: {
            lists
        }
    }
}

export function dispFetchLists () {
    return async (dispatch) => {
        const res = await fetchLists();
        const lists = await res.json();
        dispatch(getLists(lists));
    }
}


// CREATE LIST

const fetchCreateList = (body) => {
    return fetch('/api/lists', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
}

export function createList (list) {
    return {
        type: CREATE_LIST,
        payload: {
            list
        }
    }
}

export function dispCreateList(body) {
    return async (dispatch) => {
        const res = await fetchCreateList(body);
        const list = await res.json();
        dispatch(createList(list));
    }
}


// LIST_EDIT

export function editList (list) {
    return {
        type: LIST_EDIT,
        payload: {
            list
        }
    }
}

export function dispEditList (list) {
    return (dispatch) => {
        dispatch(editList(list));
    }
}


// LIST_SUBMIT

const fetchList = (listId, list) => {
    return fetch(`/api/lists/${listId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(list)
    })
}

export function submitList () {
    return {
        type: LIST_SUBMIT,
        payload: {}
    }
}

export function dispFetchList (listId, list) {
    return async (dispatch) => {
        await fetchList(listId, list);
        dispatch(submitList());
    }
}


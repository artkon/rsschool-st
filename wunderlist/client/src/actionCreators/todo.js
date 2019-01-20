import { GET_TODOS, TODO_EDIT, TODO_SUBMIT, TODO_CREATE, TODO_DONE } from '../actionTypes/todo';

const fetchTodos = (listId) => {
    return fetch(`/api/lists/${listId}/todos`)
}

export function getTodos (todos, listId) {
    return {
        type: GET_TODOS,
        payload: {
            todos, listId
        }
    }
}

export function dispFetchTodos (listId) {
    if (listId === undefined) {
        return;
    }
    return async (dispatch) => {
        const res = await fetchTodos(listId);
        const todos = await res.json();
        dispatch(getTodos(todos, listId));
    }
}


// TODO_EDIT

export function editTodo (todo) {
    return {
        type: TODO_EDIT,
        payload: {
            todo
        }
    }
}

export function dispEditTodo (todo) {
    return (dispatch) => {
        dispatch(editTodo(todo));
    }
}


// TODO_SUBMIT

const fetchTodo = (listId, todoId, todo) => {
    return fetch(`/api/lists/${listId}/todos/${todoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo)
    })
}

export function submitTodo () {
    return {
        type: TODO_SUBMIT,
        payload: {}
    }
}

export function dispFetchTodo (listId, todoId, todo) {
    return async (dispatch) => {
        await fetchTodo(listId, todoId, todo);
        dispatch(submitTodo());
    }
}


// TODO_CREATE

const fetchNewTodo = (listId, todoName) => {
    const todo = { title: todoName };
    return fetch(`/api/lists/${listId}/todos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo)
    })
}

export function createTodo () {
    return {
        type: TODO_CREATE,
        payload: {

        }
    }
}

export function dispFetchNewTodo (listId, todoName) {
    return async (dispatch) => {
        await fetchNewTodo(listId, todoName);
        dispatch(createTodo());
    }
}


// TODO_DONE

const fetchDoneTodo = (listId, todoId, todo) => {
    return fetch(`/api/lists/${listId}/todos/${todoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo)
    })
}

export function doneTodo (todo) {
    return {
        type: TODO_DONE,
        payload: {
            todo
        }
    }
}

export function dispDoneTodo (listId, idInList, todo) {
    return (dispatch) => {
        fetchDoneTodo(listId, idInList, todo);
        dispatch(doneTodo(todo));
    }
}

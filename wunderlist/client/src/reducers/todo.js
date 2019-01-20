import { GET_TODOS, TODO_EDIT, TODO_SUBMIT, TODO_CREATE, TODO_DONE } from '../actionTypes/todo';
const defaultState = { todos: [] };

export default function todo (state = defaultState, action) {
    switch (action.type) {
        case GET_TODOS:
            return { todos: action.payload.todos, listId: action.payload.listId };
        case TODO_EDIT: {
            const todoId = parseInt(action.payload.todo.todoId, 10);

            const targetTodo = state.todos.find((todo) => {
                return todo.todoId === todoId;
            });

            targetTodo.title = action.payload.todo.title;

            const todos = state.todos.slice();

            return { todos, listId: state.listId };
        }
        case TODO_SUBMIT: {
            return Object.assign({}, state);
        }
        case TODO_CREATE: {
            return Object.assign({}, state);
        }
        case TODO_DONE: {
            const todoId = parseInt(action.payload.todo.todoId, 10);

            const targetTodo = state.todos.find((todo) => {
                return todo.todoId === todoId;
            });

            targetTodo.done = action.payload.todo.done;

            const todos = state.todos.slice();

            return { todos, listId: state.listId };
        }
        default:
            return state;
    }
}

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/user';
import listReducer from '../reducers/list';
import todoReducer from '../reducers/todo';

const reducer = combineReducers({ user: userReducer, 
    list: listReducer, 
    todo: todoReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

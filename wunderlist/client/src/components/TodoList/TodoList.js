import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { 
    dispFetchTodos, 
    dispEditTodo, 
    dispFetchTodo, 
    dispFetchNewTodo, 
    dispDoneTodo 
} from '../../actionCreators/todo';

import './style.css'

class TodoList extends Component {
    state = {
        listId: this.props.match.params.listId,
        newTodoInputValue: '',
        isNewTodoInQueue: false
    }

    componentDidMount () {
        const curListId = this.props.match.params.listId;
        this.setState({listId: curListId});
        if (this.state.listId) {
            this.props.fetchData(curListId);
        }
    }
    
    componentDidUpdate (prevProps) {
        const curListId = this.props.match.params.listId;
        const oldListId = prevProps.match.params.listId;

        if (curListId !== oldListId) {
            this.setState({listId: curListId});
            this.props.fetchData(curListId);
        }

        if (this.state.isNewTodoInQueue) {
            this.props.fetchData(curListId);
            this.setState({ isNewTodoInQueue: false });
        }
    }

    doneHandler = (event) => {
        const isDone = event.target.checked;
        const todoId = event.target.getAttribute('data-todoid');
        const todo = this.props.todos.find(todo => {
            return todo.todoId === parseInt(todoId, 10);
        });
        todo.done = isDone;
        this.props.doneTodo(this.state.listId, todo.idInList, todo);
    }

    handleChangeNewTodo = (event) => {
        this.setState({ newTodoInputValue: event.target.value });
    }

    handleSubmitNewTodo = () => {
        if (this.state.newTodoInputValue) {
            this.props.createTodo(this.state.listId, this.state.newTodoInputValue);
            this.setState({ newTodoInputValue: '', isNewTodoInQueue: true });
        }
    }

    handleChange = (event) => {
        const todoId = event.target.getAttribute('data-todoid');
        const title = event.target.value;
        this.props.setTodo({title, todoId});
    }

    handleSubmit = (event) => {
        const todoId = event.target.getAttribute('data-todoid');
        const todo = this.props.todos.find(todo => {
            return todo.todoId === parseInt(todoId, 10);
        });
        this.props.submitTodo(this.state.listId, todo.idInList, todo);
    }


    render() {
        let list
        if (this.props.lists) {
            list = this.props.lists.find(item => {
                return item.id === parseInt(this.props.listId, 10);
            });
        }

        return (
            <div className="todo-list">
                <div><h2 className="todo-title">{list && list.name}</h2></div>
                <div>
                    <div className="new-todo">
                        { this.state.listId && <span>➕<input
                            className="new-todo-inout"
                            type="text" value={this.state.newTodoInputValue}
                            onChange={this.handleChangeNewTodo}
                            onBlur={this.handleSubmitNewTodo}
                        /></span>}
                    </div>
                    <ul className="todos">{
                        this.props.todos && this.props.todos.map(todo => {
                            return (<li key={todo.todoId} className="todo-item">
                                <input 
                                    type="checkbox"
                                    data-todoid={todo.todoId}
                                    checked={todo.done} 
                                    onChange={this.doneHandler}
                                />
                                <input
                                    className="todo-name" 
                                    onChange={this.handleChange}
                                    onBlur={this.handleSubmit}
                                    value={todo.title}
                                    data-todoid={todo.todoId}
                                />
                            </li>)
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

TodoList.propTypes = {
    fetchData: PropTypes.func,
    setTodo: PropTypes.func,
    submitTodo: PropTypes.func,
    createTodo: PropTypes.func,
    doneTodo: PropTypes.func,
    todos: PropTypes.array,
    match: PropTypes.object,
    lists: PropTypes.array,
    listId: PropTypes.string,
}

export default connect(
    (state) => ({ todos: state.todo.todos, 
        listId: state.todo.listId,
        lists: state.list.lists
    }),
    { 
        fetchData: dispFetchTodos, 
        setTodo: dispEditTodo, 
        submitTodo: dispFetchTodo,
        createTodo: dispFetchNewTodo,
        doneTodo: dispDoneTodo,
    }
)(TodoList);

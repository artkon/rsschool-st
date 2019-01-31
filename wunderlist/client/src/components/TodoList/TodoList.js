import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { 
    dispFetchTodos, 
    dispEditTodo, 
    dispFetchTodo, 
    dispFetchNewTodo, 
    dispDoneTodo,
    dispDeleteTodo
} from '../../actionCreators/todo';

import { dispDeleteList, dispFetchEditOwnerList } from '../../actionCreators/list'

import './style.css'

class TodoList extends Component {
    state = {
        listId: this.props.match.params.listId,
        newTodoInputValue: '',
    }

    componentDidMount () {
        const curListId = this.props.match.params.listId;
        this.setState({listId: curListId});
        if (this.state.listId) {
            this.props.fetchData(curListId);
        }
    }
    
    componentDidUpdate (prevProps) {
        let curListId = this.props.match.params.listId;
        const oldListId = prevProps.match.params.listId;

        const isUrlWithListId = curListId !== undefined;
        const isListsNonEmpty = this.props.lists && this.props.lists.length > 0;
        if (!isUrlWithListId && isListsNonEmpty) {
            const listId = this.props.lists[0].id + "";
            this.props.history.push(`/app/lists/${listId}`);
            curListId = listId;
        }

        if (curListId !== oldListId) {
            this.setState({listId: curListId});
            this.props.fetchData(curListId);
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
            this.setState({ newTodoInputValue: '' });
        }
    }

    handleSubmitNewTodoOnEnter = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmitNewTodo();
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

    handleDeleteTodo = (event) => {
        const todoId = event.target.getAttribute('data-todoid');
        const todo = this.props.todos.find(todo => {
            return todo.todoId === parseInt(todoId, 10);
        });
        this.props.deleteTodo(this.state.listId, todo.idInList);
    }

    handleDeleteList = () => {
        this.props.deleteList(this.state.listId);
        this.props.history.push('/app');
    }

    handleShareList = (event) => {
        const userId = parseInt(event.target.previousSibling.value, 10);
        event.target.previousSibling.value = '';
        if (typeof userId === 'number' && !isNaN(userId)) {
            this.props.addOwner(this.props.listId, userId);
        }
    }

    handleRemoveOwner = (event) => {
        const userId = parseInt(event.target.textContent, 10);
        if (typeof userId === 'number' && !isNaN(userId)) {
            if (userId === this.props.user.userId) {
                alert('You cann\'t remove yourself from list');
                return;
            }
            this.props.addOwner(this.props.listId, userId, true);
        }
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
                {list && <div> 
                    <div className="todo-list-header">
                        <h2 className="todo-title">{list.name}</h2>
                        <button 
                            className="delete-list-button"
                            onClick={this.handleDeleteList}>
                            Delete list
                        </button>
                    </div>
                    <div className="todo-list-header share-list">
                        <div>
                            <span>List shared with users (ID): </span>
                            <ul className="owners-list">
                                {list.owners.map(owner =>
                                    <li className="owner-list-item" 
                                        key={owner} 
                                        onClick={this.handleRemoveOwner}>
                                        <button title="Delete user">{owner}</button>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div>
                            <input placeholder="Enter User ID to share" className="share-list-input"/>
                            <button onClick={this.handleShareList} 
                                className="share-list-button">Share</button>
                        </div>
                    </div>
                </div>}
                <div>
                    {this.state.listId && <div className="new-todo">
                        <span role="img" aria-label="Plus">➕</span>
                        <input
                            className="new-todo-input"
                            type="text" value={this.state.newTodoInputValue}
                            onChange={this.handleChangeNewTodo}
                            onBlur={this.handleSubmitNewTodo}
                            onKeyPress={this.handleSubmitNewTodoOnEnter}
                            placeholder="Enter new TODO"
                        />
                    </div>}
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
                                <button 
                                    className="delete-todo-button" 
                                    onClick={this.handleDeleteTodo}>
                                    <span
                                        data-todoid={todo.todoId}
                                        role="img" 
                                        aria-label="Delete">
                                        ✕
                                    </span>
                                </button>
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
    deleteTodo: PropTypes.func,
    deleteList: PropTypes.func,
    addOwner: PropTypes.func,
    todos: PropTypes.array,
    match: PropTypes.object,
    history: PropTypes.object,
    lists: PropTypes.array,
    listId: PropTypes.string,
    user: PropTypes.object,
}

export default connect(
    (state) => ({ todos: state.todo.todos, 
        listId: state.todo.listId,
        lists: state.list.lists,
        user: state.user
    }),
    { 
        fetchData: dispFetchTodos, 
        setTodo: dispEditTodo, 
        submitTodo: dispFetchTodo,
        createTodo: dispFetchNewTodo,
        doneTodo: dispDoneTodo,
        deleteTodo: dispDeleteTodo,
        deleteList: dispDeleteList,
        addOwner: dispFetchEditOwnerList
    }
)(TodoList);

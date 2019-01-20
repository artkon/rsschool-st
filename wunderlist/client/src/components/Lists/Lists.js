import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

import { dispFetchLists, dispEditList, dispFetchList } from '../../actionCreators/list';
import './style.css';

class Lists extends Component {
    componentDidMount () {
        this.props.getLists();
    }

    handleChange = (event) => {
        const id = event.target.getAttribute('data-listid');
        const name = event.target.value;
        this.props.setList({name, id});
    }

    handleSubmit = (event) => {
        const id = event.target.getAttribute('data-listid');
        const list = this.props.lists.find(list => {
            return list.id === parseInt(id, 10);
        });
        this.props.submitList(id, list);
    }

    render() {
        return (
            <ul className="lists">
                { 
                    this.props.lists && this.props.lists.map(list => {
                        return <li key={list.id} className="list-item">
                            <NavLink
                                to={"/app/lists/" + list.id} 
                                className="list-link"
                                activeClassName="list-link-active">
                                <span className="list-icon" role="img" aria-label="List">🗒</span>
                                <input 
                                    className="list-name" 
                                    value={list.name}
                                    data-listid={list.id} 
                                    onChange={this.handleChange}
                                    onBlur={this.handleSubmit}
                                />
                            </NavLink>
                        </li>
                    })
                }
            </ul>
        )
    }
}

Lists.propTypes = {
    getLists: PropTypes.func,
    setList: PropTypes.func,
    submitList: PropTypes.func,
    lists: PropTypes.array,
}

export default connect(
    (state) => ({ lists: state.list.lists}),
    { getLists: dispFetchLists, setList: dispEditList, submitList: dispFetchList }
)(Lists);

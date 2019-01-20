import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { dispCreateList } from '../../actionCreators/list';
import './style.css'

class SidebarButton extends Component {

    createListHandler = (e) => {
        e.preventDefault();
        this.props.createList({name:"List"});
    }

    render() {
        return (
            <button className="sidebar-button" onClick={this.createListHandler}>
                <span className="sidebar-button-icon" role="img" aria-label="Plus">️️️❇️</span>
                <span className="sidebar-button-label">{ this.props.label }</span>
            </button>
        )
    }
}

SidebarButton.propTypes = {
    label: PropTypes.string,
    createList: PropTypes.func
}

export default connect(
    () => ({}),
    { createList: dispCreateList }
)(SidebarButton);

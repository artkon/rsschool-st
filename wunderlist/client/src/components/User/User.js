import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { dispFetchUsername } from '../../actionCreators/user';
import './style.css'

class User extends Component {

    componentDidMount () {
        this.props.fetchData();
    }

    render() {
        return (
            <div className="user">
                <span className="user-icon" role="img" aria-label="Avatar">👤</span>
                <span className="user-username"> { this.props.username } </span>
            </div>
        )
    }
}

User.propTypes = {
    fetchData: PropTypes.func,
    username: PropTypes.string,
}

export default connect(
    (state) => ({ username: state.user.username}),
    { fetchData: dispFetchUsername }
)(User);

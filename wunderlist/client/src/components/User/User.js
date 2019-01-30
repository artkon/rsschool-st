import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { dispFetchUser, 
    dispEditUsername, 
    dispSetUsername, 
    dispDeleteUser 
} from '../../actionCreators/user';
import './style.css'

class User extends Component {
    state = {
        isChanged: false
    }
    
    componentDidMount () {
        this.props.getUser();
    }

    handleUsernameChange = (event) => {
        const username = event.target.value;
        this.props.editUsername(username);
        this.setState({ isChanged: true });
    }

    handleUsernameSubmit = () => {
        if (this.state.isChanged) {
            this.props.setUsername(this.props.user.username);
            this.setState({ isChanged: false });
        }
    }

    handleDeleteUser = () => {
        const confirmation = window.confirm("Are you sure, that you want to delete user account?");
        if (confirmation) {
            this.props.deleteUser();
        }
    }

    render() {
        return (
            <div>
                <div className="user">
                    <span className="user-icon" role="img" aria-label="Avatar">👤</span>
                    <input 
                        className="user-username-input" 
                        type="text"
                        value={this.props.user.username || ""}
                        onChange={this.handleUsernameChange}
                        onBlur={this.handleUsernameSubmit} />
                    
                    <button title="Delete user" 
                        className="delete-user-button"
                        onClick={this.handleDeleteUser}>
                        <span>✕</span>
                    </button>
                </div>
                <div>
                    <span className="userid">UserID: {this.props.user.userId}</span>                
                </div>
            </div>
        )
    }
}

User.propTypes = {
    getUser: PropTypes.func,
    editUsername: PropTypes.func,
    setUsername: PropTypes.func,
    dispDeleteUser: PropTypes.func,
    deleteUser: PropTypes.func,
    user: PropTypes.object,
}

export default connect(
    (state) => ({ user: state.user}),
    { getUser: dispFetchUser, 
        editUsername: dispEditUsername, 
        setUsername: dispSetUsername,
        deleteUser: dispDeleteUser }
)(User);

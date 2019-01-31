import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import AuthForm from '../AuthForm';
import './style.css';

import { dispRegisterUser, dispLoginUser } from '../../actionCreators/user';

class Auth extends Component {
    componentDidUpdate() {
        if (this.props.user) {
            this.props.history.push("/app");
        }
    }

    state = {
        isLoginMode: this.props.isLogin || false
    };

    register = userInfo => {
        this.props.registerUser(userInfo)
    }

    login = userInfo => {
        this.props.loginUser(userInfo)
    }

    toggleForm = () => {
        this.setState({ isLoginMode: !this.state.isLoginMode })
    }

    render() {
        const args = this.state.isLoginMode
            ? { authHandler: this.login, label: "LOGIN" }
            : { authHandler: this.register, label: "REGISTER" }
        return (
            <div className="auth-wrap">
                <div className="auth">
                    <AuthForm {...args} />
                    <div className="or-choise">or&nbsp;
                        <Link
                            to={this.state.isLoginMode ? "/register" : "/"} 
                            onClick={this.toggleForm}
                            className="toggle-form-text">
                            { this.state.isLoginMode 
                                ? 'Create new account'
                                : 'Log in with your account'
                            }
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({ user: state.user }), { registerUser: dispRegisterUser, loginUser: dispLoginUser }
)(Auth);

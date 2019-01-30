import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

import AuthForm from '../AuthForm';
import './style.css';


class Auth extends Component {
    state = {
        isLoginMode: this.props.isLogin || false
    };

    notify = (text, color = 'red') => toast(text, {
        closeButton: false,
        className: color + '-background',
        bodyClassName: color + "-font",
        progressClassName: color + '-progress-bar'
      });

    isValid = userInfo => {
        const pattern = new RegExp("^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,48}[a-zA-Z0-9]$");
        if (!pattern.test(userInfo.username)) {
            this.notify('Invalid login!');
            this.notify('Length from 6 to 50 characters, letters, digist, "_", "." are allowed');
            return false;
        }
    
        if (!pattern.test(userInfo.password)) {
            this.notify('Invalid password!');
            this.notify('Length from 6 to 50 characters, letters, digist, "_", "." are allowed');
            return false;
        }

        return true;
    }

    onSubmitRegister = userInfo => {
        if(!this.isValid(userInfo)) {
            return;
        }

        fetch('/auth/register/', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then((res) => {
                if (res.url.includes('register')) {
                    this.notify("You can't use this username or password!");
                } else {
                    this.notify("You registred successfully!", 'green');
                    this.notify("Now you can LogIn!", 'green');
                }
            })
            .catch(error => {
                this.notify('Server error!');
                console.log('Error:', error)
            });
    }

    onSubmitLogin = userInfo => {
        fetch('/auth/login/', {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res => {
                if (res.redirected) {
                    if (!res.url.includes('app')) {
                        this.notify("Username or password isn't correct!");
                    } else {
                        this.props.history.push('/app');
                    }
                } else {
                    this.notify("Server error!");
                }
            })
            .catch(error => {
                this.notify('Server error!');
                console.log('Error:', error)
            });
    }

    toggleForm = () => {
        this.setState({ isLoginMode: !this.state.isLoginMode })
    }

    render() {
        const args = this.state.isLoginMode
            ? { authHandler: this.onSubmitLogin, label: "LOGIN" }
            : { authHandler: this.onSubmitRegister, label: "REGISTER" }
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
                <ToastContainer />
            </div>
        )
    }
}

export default Auth;

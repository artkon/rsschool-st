import React, { Component } from 'react';

import Button from '../Button';
import './style.css';
import githubImgPath from './gh.png';

class AuthForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    onSubmit = event => {
        event.preventDefault();
        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.action(userInfo);
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="auth">
                <h2>Another yet Wunderlist</h2>
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="USERNAME"
                        value={username}
                        onChange={this.handleInputChange}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="PASSWORD"
                        value={password}
                        onChange={this.handleInputChange}
                    />
                    <Button type="submit" label={this.props.label} />
                </form>
                <div className="social-auth">
                    <span className="login-with">Login with</span>
                    <a href="http://127.0.0.1:3000/auth/github">
                        <img src={githubImgPath} width="40" alt="github"></img>
                    </a>
                </div>
            </div>
        )
    }
}

export default AuthForm;

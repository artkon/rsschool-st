import React, { Component } from 'react';

import Button from '../Button';

class Wunderlist extends Component {
    state = { user: null };

    componentDidMount () {
        fetch('/api/username')
            .then(res => res.json())
            .then(user => {
                this.setState({ user })
            })
    }


    logOut = () => {
        fetch('/auth/logout')
            .then(res => {
                if(res.redirected) {
                    this.props.history.push('/');
                } else {
                    console.log("Not redirected");
                }
            });
    }


    render() {
        const { user } = this.state
        return (
            <div>
                <span>Hello {user ? user.username : 'No user data'}!</span>
                <div className="logout">
                    <Button onClick={this.logOut} label = "LogOut" />
                </div>
            </div>
        )
    }
}

export default Wunderlist;

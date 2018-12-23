import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../Button';
import { dispFetchUsername } from '../../actionCreators/user';

class Wunderlist extends Component {
    state = { user: null };

    componentDidMount () {
        this.props.fetchData();
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
                    {
                        this.props.username
                        && <div>Username is {this.props.username}</div>
                    }
                </div>
            </div>
        )
    }
}

// export default Wunderlist;

export default connect(
    (state) => ({ username: state.username}),
    { fetchData: dispFetchUsername }
)(Wunderlist);

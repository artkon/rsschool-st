import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ user, component: Component, ...rest }) => {
    return <Route {...rest}
        render={props => (
            user.username
                ? <Component {...rest} {...props} />
                : <Redirect to="/" /> 
        )}
    />;
};

const mapStateToProps = ({ user }) => ({ user });
const connectPrivateRoute = connect(mapStateToProps)(withRouter(PrivateRoute));
export default connectPrivateRoute;

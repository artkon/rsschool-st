import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from '../Auth';
import Wunderlist from '../Wunderlist';
import NotFound from '../NotFound';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact
                        path="/login" 
                        render={(props) => <Auth {...props} isLogin={true}/>} 
                    />
                    <Route exact
                        path="/register" 
                        render={(props) => <Auth {...props} isLogin={false}/>} 
                    />
                    <Route path="/app" component={Wunderlist} />
                    <Route path="/*" component={NotFound} />
                </Switch>
            </Router>
        )
    }
}

export default App;

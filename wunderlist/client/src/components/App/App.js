import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from '../Auth';
import Sidebar from '../Sidebar';
import TodoList from '../TodoList';
import NotFound from '../NotFound';
import './style.css'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">   
                    <Route path="/app" component={Sidebar} />

                    <Switch>
                        <Route exact
                            path="/" 
                            render={(props) => <Auth {...props} isLogin={true}/>}
                        />
                        <Route exact
                            path="/register" 
                            render={(props) => <Auth {...props} isLogin={false}/>}
                        />

                        <Route exact path="/app" component={TodoList} />
                        <Route exact path="/app/lists/:listId" 
                            component={TodoList}
                        />
                        
                        <Route path="/*" component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;

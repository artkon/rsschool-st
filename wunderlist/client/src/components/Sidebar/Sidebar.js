import React, { Component } from 'react';

import User from '../User';
import Lists from '../Lists';
import SidebarButton from '../SidebarButton';
import './style.css'

class Sidebar extends Component {
        render() {
        return (
            <div className="sidebar">
                <User/>
                <Lists/>
                <SidebarButton label="Add new list" />
            </div>
        )
    }
}

export default Sidebar;

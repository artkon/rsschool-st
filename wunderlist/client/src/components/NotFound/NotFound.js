import React from 'react';
import { Link } from 'react-router-dom';

function NotFound () {
    return (
        <div>
            <h2>Not found <span role="img" aria-label="Stop">🛑</span></h2>
            <Link to="/">Go gome</Link>
        </div>
    )
}

export default NotFound;

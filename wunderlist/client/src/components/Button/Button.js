import React from 'react';

function Button ({ label = 'Go!', onClick = ()=>{} }) {
    return (
        <button onClick={onClick} >{label}</button>
    )
}

export default Button;

import React from 'react';
import '../styles/Toast.css';

const Toast = ({ message }) => {
    return (
        <div className='toast'><p>{message}</p></div>
    )
}

export default Toast;
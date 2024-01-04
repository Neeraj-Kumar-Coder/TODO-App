import React from 'react';
import "../styles/Loader.css";

const Loader = () => {
    return (
        <>
            <div className='backdrop'></div>
            <img className='loader' src="./shockwave_loader.gif" alt='loader' />
        </>
    )
}

export default Loader;
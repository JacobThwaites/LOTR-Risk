import React from 'react'
export default function NotFound() {
    return ( 
        <div className='not-found'>
            <h1>Game Not Found</h1> 
            <p>No game could be found with the given URL</p>
            <a href={`${process.env.PUBLIC_URL}/`}>Click here to return home</a>
        </div>

    );
} 
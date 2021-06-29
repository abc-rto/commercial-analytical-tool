import React from 'react';
import Header from './Header';


// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    return (
        <div>
            <Header />
            <div className="container">
            { props.children }
            </div>
        </div>
    );
};
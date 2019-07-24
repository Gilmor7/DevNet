import React from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="/register" className="nav-link"> Sign Up </Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link"> Login </Link>
            </li>
        </ul>
    )
}

export default GuestLinks;

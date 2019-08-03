import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthLinks = ({ logout, avatar, name }) => {
    return (
        <ul className="navbar-nav ml-auto">

            <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                    Dashboard
                </Link>
            </li>

            <li className="nav-item">
                <a
                    href="#"
                    onClick={logout}
                    className="nav-link">
                    <img
                        src={avatar}
                        alt={name}
                        style={{ width: '25px', margin: '0 6px', borderRadius: '50%' }}
                        title="You must have gravatar connected to email for image" />
                    Logout </a>
            </li>

        </ul>
    )
}

AuthLinks.propTypes = {
    logout: PropTypes.func.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string
}

export default AuthLinks

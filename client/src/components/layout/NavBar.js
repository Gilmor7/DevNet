import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/GlobalAuthContext';

import GuestLinks from '../view/GuestLinks';
import AuthLinks from '../view/AuthLinks';


function NavBar() {

    const { isAuthenticated, user, logout_user } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand"
                    to={isAuthenticated ? '/dashboard' : '/'} >DevNet</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/profiles" className="nav-link"> Developers </Link>
                        </li>
                    </ul>

                    {isAuthenticated ? <AuthLinks
                        logout={logout_user}
                        avatar={user.avatar}
                        name={user.name} /> : <GuestLinks />}

                </div>
            </div>
        </nav>
    )
}

export default NavBar;

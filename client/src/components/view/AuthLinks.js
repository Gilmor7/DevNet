import React from 'react'
//proptypes

const AuthLinks = ({ logout, avatar, name }) => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a
                    href="#"
                    onClick={logout}
                    className="nav-link">
                    <img
                        src={avatar}
                        alt={name}
                        style={{ width: '35px', marginRight: '6px', borderRadius: '50%' }}
                        title="You must have gravatar connected to email for image" />
                    Logout </a>
            </li>
        </ul>
    )
}

export default AuthLinks

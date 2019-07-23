import React, { useContext } from 'react';
import { AuthContext } from '../../state/GlobalAuthContext'

const Profiles = () => {

    const {
        isAuthenticated,
        user
    } = useContext(AuthContext)

    return (
        <div className="container">
            {isAuthenticated ? <div>{"hello " + user.name} </div> : <div>nonononon</div>}
        </div>
    )
}

export default Profiles

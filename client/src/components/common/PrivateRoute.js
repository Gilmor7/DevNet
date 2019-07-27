import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../../state/GlobalAuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ?
                    <Component {...props} /> : <Redirect to="/" />
            }
        />
    )
}

export default PrivateRoute

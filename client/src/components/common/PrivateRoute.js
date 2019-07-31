import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../../state/GlobalAuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ?
                    <Component  {...props} /> : <Redirect to="/" />
            }
        />
    )
}


PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
}

export default PrivateRoute;

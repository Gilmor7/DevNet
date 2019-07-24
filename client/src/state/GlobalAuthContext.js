import React, { useState, createContext, useEffect } from "react";
import isEmpty from '../utils/isEmpty';

import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../services/authService';

const AuthContext = createContext();
const { Provider } = AuthContext;


const AuthContextProvider = ({ children }) => {

    //  Set the auth context state
    const [isAuthenticated, set_isAuthenticated] = useState(false);
    const [user, set_user] = useState({});

    const set_current_user = payload => {
        console.log('test to isEmpty from globalAuth component set user ' + isEmpty(payload))
        set_isAuthenticated(!isEmpty(payload));
        set_user(payload);
    }

    const logout_user = () => {
        // remove token from localStorage
        localStorage.removeItem('jwtToken');
        //remove auth header for future requests
        setAuthToken(false);
        //set current user to {} and isAuthenticated to false
        set_current_user({});

    }


    //set up the effects 

    //check for valid token in localStorage the first time running
    useEffect(() => {
        //check for token
        if (localStorage.jwtToken) {
            // set auth token header auth
            setAuthToken(localStorage.jwtToken);
            //decode token and get user info and exp
            const decoded = jwt_decode(localStorage.jwtToken);
            // set user and isAuth 
            set_current_user(decoded);

            //check for exp of token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                console.log('token expired')
                //token to longer valid so logout the user
                logout_user()
                //TODO: clear the profile

                //redirect to login page
                window.location.href = '/login';
            }
        }
    }, [])


    const state = {
        user,
        isAuthenticated
    }

    const actions = {
        set_current_user,
        logout_user
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { AuthContextProvider, AuthContext };
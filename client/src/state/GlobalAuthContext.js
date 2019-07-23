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
        set_isAuthenticated(!isEmpty(payload));
        set_user(payload);
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
        }
    }, [])


    const state = {
        user,
        isAuthenticated
    }

    const actions = {
        set_current_user
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { AuthContextProvider, AuthContext };
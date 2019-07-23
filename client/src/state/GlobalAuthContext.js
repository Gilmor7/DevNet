import React, { useState, createContext } from "react";
import isEmpty from '../utils/isEmpty';

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
import React, { useState, createContext, useContext } from "react";
import jwt_decode from 'jwt-decode';
import { AuthContext } from './GlobalAuthContext'
import { loginUser, setAuthToken } from '../services/authService';

const LoginStore = createContext();
const { Provider } = LoginStore;


const LoginProvider = ({ children }) => {

    //get Auth Context actions to set authentication
    const { set_current_user } = useContext(AuthContext);

    //  Set the register component state
    const [fields, set_fields] = useState({
        email: '',
        password: ''
    });
    const [errors, set_errors] = useState({});

    // Set the actions we want to expose to the register component
    const on_change = e => {
        set_fields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const on_submit = (e, history) => {
        e.preventDefault();

        loginUser({ ...fields })
            .then(res => {
                // save token to localStorge
                const { token } = res.data;
                localStorage.setItem('jwtToken', token);
                //set token to Auth header
                setAuthToken(token);
                //decode token to get user data
                const decoded = jwt_decode(token);
                // set current user (to global auth component)
                set_current_user(decoded);
                //redirect 
                history.push('/dashboard');
            })
            .catch(err => {
                if (err.response.data.isJoi) {
                    set_errors({ ...err.response.data })
                }
                else (history.push('/error-page'))
            });
    }

    const state = {
        ...fields,
        errors
    }

    const actions = {
        on_change,
        on_submit
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { LoginProvider, LoginStore };
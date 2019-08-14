import React, { useState, createContext, useEffect, useContext } from "react";
import isEmpty from '../utils/isEmpty';

import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../services/authService';
import { deleteAccount } from '../services/profileServices';

import { profileStore } from '../state/Profile.store';

const AuthContext = createContext();
const { Provider } = AuthContext;


const AuthContextProvider = ({ children }) => {
    //get clear profile for clear the current profile when user logout
    const { clear_current_profile, getProfile } = useContext(profileStore)

    //  Set the auth context state
    const [isAuthenticated, set_isAuthenticated] = useState(false);
    const [user, set_user] = useState({});

    const set_current_user = payload => {
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
        // clear the current profile
        clear_current_profile()

    }

    const delete_account = () => {
        if (window.confirm('You sure? This can Not be undone!')) {
            deleteAccount()
                .then(res => {
                    clear_current_profile();
                    set_current_user({});
                })
                .catch(err => {
                    //redirect to error page
                })
        }
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
                //token to longer valid so logout the user
                logout_user()
                // clear the profile
                clear_current_profile()
                //redirect to login page
                window.location.href = '/';
            }
        }
    }, [])


    //if user authenticated get current profile from DB
    useEffect(() => {
        if (isAuthenticated) {
            getProfile()
        }
    }, [isAuthenticated])


    const state = {
        user,
        isAuthenticated
    }

    const actions = {
        set_current_user,
        logout_user,
        delete_account
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { AuthContextProvider, AuthContext };
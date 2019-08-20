import React, { useState, createContext } from "react";
import { registerUser } from '../services/authService';

const RegisterStore = createContext();
const { Provider } = RegisterStore;


const RegisterProvider = ({ children }) => {
    //  Set the register component state
    const [fields, set_fields] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [errors, set_errors] = useState({});
    const [loading, set_loading] = useState(false);

    // Set the actions we want to expose to the register component
    const on_change = e => {
        set_fields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const on_submit = (history, e) => {
        e.preventDefault();
        set_loading(true);

        const newUser = {
            ...fields
        }

        registerUser(newUser)
            .then(res => {
                history.push('/login')
            })
            .catch(err => {
                set_loading(false)
                if (err.response.data.isJoi) {
                    set_errors({ ...err.response.data });
                }
                else (history.push('/error-page'));
            })

    }

    const state = {
        ...fields,
        errors,
        loading
    }

    const actions = {
        on_change,
        on_submit
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { RegisterProvider, RegisterStore };
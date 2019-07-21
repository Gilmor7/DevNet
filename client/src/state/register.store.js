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

    // Set the actions we want to expose to the register component
    const on_change = e => {
        set_fields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const on_submit = e => {
        e.preventDefault();

        const newUser = {
            ...fields
        }

        registerUser(newUser)
            .catch(err => {
                console.log(err.response.data)
                set_errors({ ...err.response.data });

            })

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

export { RegisterProvider, RegisterStore };
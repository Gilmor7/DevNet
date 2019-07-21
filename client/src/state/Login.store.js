import React, { useState, createContext } from "react";

const LoginStore = createContext();
const { Provider } = LoginStore;


const LoginProvider = ({ children }) => {
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

    const on_submit = e => {
        e.preventDefault();

        const userData = {
            ...fields
        }
        console.log(userData);
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
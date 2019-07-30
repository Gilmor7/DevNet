import React, { useState, createContext, useContext } from "react";

import { addExperience } from '../services/profileServices';
import { profileStore } from '../state/Profile.store';
import isEmpty from '../utils/isEmpty';

const ExpStore = createContext();
const { Provider } = ExpStore;


const ExpProvider = ({ children }) => {
    //  Set the AddExperience component state
    const [fields, set_fields] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [errors, set_errors] = useState({});

    // get profile store variables to set the profile state after adding new experience
    const { set_profile } = useContext(profileStore);

    // Set the actions we want to expose to the AddExperience component
    const on_change = e => {
        set_fields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }


    const set_current_job = () => {
        set_fields({
            ...fields,
            current: !fields.current,
            to: ''
        })
    }


    const on_submit = (history, e) => {
        e.preventDefault();

        // set the not empty fields to new object that will be sent to server
        const newExp = {};

        //loop over the fields and add the texted fields to the newExp object 
        Object.keys(fields).forEach(key => {
            if (!isEmpty(fields[key])) newExp[key] = fields[key];
        })

        addExperience(newExp)  // axios post request to server (return promise)
            .then(res => {
                //if everything is ok set the new profile and redirect to dashboard
                set_profile(res.data);
                history.push('/dashboard');
            })
            .catch(err => {
                //if there are validation errors set them to the errors object 
                set_errors({ ...err.response.data });
            })
    }

    const state = {
        fields,
        errors
    }

    const actions = {
        on_change,
        on_submit,
        set_current_job
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { ExpProvider, ExpStore };
import React, { useState, createContext, useContext } from "react";

import { profileStore } from './Profile.store';
import isEmpty from '../utils/isEmpty';

const AddDetailStore = createContext();
const { Provider } = AddDetailStore;


const AddDetailProvider = ({ children, initialState, fetchFunc }) => {
    //  Set the AddDetail as state component  that will be the store 
    // for both components AddExperience and AddEducation components
    const [fields, set_fields] = useState(initialState);

    const [errors, set_errors] = useState({});

    // get profile store variables to set the profile state after adding new experience/education
    const { set_profile } = useContext(profileStore);

    // Set the actions we want to expose to the AddExperience/ AddEducation component
    const on_change = e => {
        set_fields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }


    const set_to_current = () => {
        set_fields({
            ...fields,
            current: !fields.current,
            to: ''
        })
    }


    const on_submit = (history, e) => {
        e.preventDefault();

        // set the not empty fields to new object that will be sent to server
        const newDetail = {};

        //loop over the fields and add the texted fields to the newDetail object 
        Object.keys(fields).forEach(key => {
            if (!isEmpty(fields[key])) newDetail[key] = fields[key];
        })

        fetchFunc(newDetail)  // axios post request to server (return promise)
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
        set_to_current
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { AddDetailProvider, AddDetailStore };
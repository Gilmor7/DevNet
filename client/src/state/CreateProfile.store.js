import React, { useState, createContext, useContext } from "react";

import { createProfile } from '../services/profileServices';
import { profileStore } from '../state/Profile.store';
import isEmpty from '../utils/isEmpty';

const CreateProfileStore = createContext();
const { Provider } = CreateProfileStore;


const CreateProfileProvider = ({ children }) => {
    //  Set the register component state
    const [fields, set_fields] = useState({
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        social: {
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: ''
        }

    });
    const [errors, set_errors] = useState({});
    const [display_social, set_display_social] = useState(false);

    // get profile store variables to set the profile state 
    const { set_profile } = useContext(profileStore);

    // Set the actions we want to expose to the register component
    const on_change = e => {
        set_fields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const on_change_social = e => {
        const newSocial = {
            ...fields.social,
            [e.target.name]: e.target.value
        }

        set_fields({
            ...fields,
            social: newSocial
        })
    }

    const on_submit = (history, e) => {
        e.preventDefault();
        const newProfile = {};

        //set the fields to loop over them 
        const checkFields = {
            ...fields,
            ...fields.social
        };
        delete checkFields.social; //prevent duplicates

        //loop over the fields and add the texted fields to the newProfile object 
        Object.keys(checkFields).forEach(key => {
            if (!isEmpty(checkFields[key])) newProfile[key] = checkFields[key];
        })

        // axios post request to server (return promise)
        // the create profile route works for both create and update profile
        createProfile(newProfile)
            .then(res => {
                //if everything is ok set the new profile and redirect to dashboard
                set_profile(res.data);
                history.push('/dashboard')
            })
            .catch(err => {
                //if there are validation errors set them to the errors object 
                set_errors({ ...err.response.data });
                //take care of server error
            })
    }

    const state = {
        fields,
        ...fields,
        display_social,
        errors
    }

    const actions = {
        on_change,
        on_change_social,
        on_submit,
        set_display_social,
        set_fields
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { CreateProfileProvider, CreateProfileStore };
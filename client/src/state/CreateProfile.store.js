import React, { useState, createContext, useContext } from "react";

import { createProfile } from '../services/profileServices';
import { profileStore } from '../state/Profile.store';

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

        // set the required fields
        const newProfile = {
            handle: fields.handle,
            status: fields.status,
            skills: fields.skills
        }

        //check for the optional fields and add the fulls (for prevent validation for optional fields)

        const optionalFields = {
            ...fields.social,
            location: fields.location,
            company: fields.company,
            website: fields.website,
            bio: fields.bio,
            githubusername: fields.githubusername,
        }

        //loop over the optional fields and add the texted fields to the newProfile object 
        Object.keys(optionalFields).forEach(key => {
            if (optionalFields[key].trim() !== '') newProfile[key] = optionalFields[key];
        })

        createProfile(newProfile)
            .then(res => {
                set_profile(res.data);
                history.push('/dashboard')
            })
            .catch(err => {
                set_errors({ ...err.response.data });
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
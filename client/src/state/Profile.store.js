import React, { useState, createContext } from "react";
import { getCurrentProfile, deleteExperience, deleteEducation } from '../services/profileServices';

const profileStore = createContext();
const { Provider } = profileStore;


const ProfileProvider = ({ children }) => {
    //  Set the Profile Global state
    const [profile, set_profile] = useState(null)
    // const [profiles, set_profiles] = useState(null)
    const [profile_loading, set_profile_loading] = useState(false)
    // const [error_message, set_error_message] = useState(null)

    //get profile
    const get_Profile = () => {
        set_profile_loading(true);

        getCurrentProfile()   //fetch profile data from DB with user id on header(axios default)
            .then(res => {
                set_profile(res.data)
                set_profile_loading(false);
            })
            .catch(err => {
                set_profile({})
                set_profile_loading(false);
            });
    }

    //clear current profile
    const clear_current_profile = () => {
        set_profile(null);
    }

    const delete_experience = expId => {
        deleteExperience(expId)
            .then(res => {
                set_profile(res.data)
            })
            .catch(err => console.log(err.response.data))
    }

    const delete_education = eduId => {
        deleteEducation(eduId)
            .then(res => {
                set_profile(res.data)
            })
            .catch(err => console.log(err.response.data))
    }

    //profile_not_found
    //get profiles

    const state = {
        profile,
        profile_loading
    }

    const actions = {
        clear_current_profile,
        get_Profile,
        set_profile,
        delete_experience,
        delete_education
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { ProfileProvider, profileStore };
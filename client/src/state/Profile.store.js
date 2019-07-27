import React, { useState, createContext } from "react";
import { getCurrentProfile } from '../services/profileServices';

const profileStore = createContext();
const { Provider } = profileStore;


const ProfileProvider = ({ children }) => {
    //  Set the register component state
    const [profile, set_profile] = useState(null)
    // const [profiles, set_profiles] = useState(null)
    const [profile_loading, set_profile_loading] = useState(true)
    // const [error_message, set_error_message] = useState(null)

    //get profile
    const get_Profile = () => {
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


    //profile_not_found
    //get profiles

    const state = {
        profile,
        profile_loading
    }

    const actions = {
        clear_current_profile,
        get_Profile,
        set_profile
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { ProfileProvider, profileStore };
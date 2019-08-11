import React, { useState, createContext } from "react";
import { getCurrentProfile, deleteExperience, deleteEducation, getAllProfiles } from '../services/profileServices';

const profileStore = createContext();
const { Provider } = profileStore;


const ProfileProvider = ({ children }) => {
    //  Set the Profile Global state
    const [profile, set_current_profile] = useState(null)
    const [profiles, set_profiles] = useState([])
    const [profile_loading, set_profile_loading] = useState(false)


    const set_profile = newProfile => {
        localStorage.setItem('currentProfile', JSON.stringify(newProfile));
        set_current_profile(newProfile)
    }

    const getProfile = () => {

        const lsProfile = localStorage.getItem('currentProfile');
        if (lsProfile)
            set_profile(JSON.parse(lsProfile));

        else get_Profile();

    }

    //get all profiles 
    const get_all_profiles = () => {
        set_profile_loading(true);

        getAllProfiles()
            .then(res => {
                set_profiles(res.data)
                set_profile_loading(false);
                sessionStorage.setItem('allProfiles', JSON.stringify(res.data))
            })
            .catch(err => {
                set_profiles([]);
                set_profile_loading(false);
            });
    }

    const getProfiles = () => {
        const profiles = sessionStorage.getItem('allProfiles')

        if (profiles) set_profiles(JSON.parse(profiles));
        else get_all_profiles();

    }

    //get profile
    const get_Profile = () => {
        set_profile_loading(true);

        getCurrentProfile()   //fetch profile data from DB with user id on header(axios default)
            .then(res => {
                set_profile(res.data)
                set_profile_loading(false);
                localStorage.setItem('currentProfile', JSON.stringify(res.data))
            })
            .catch(err => {
                set_profile({})
                set_profile_loading(false);
            });
    }

    //clear current profile
    const clear_current_profile = () => {
        set_profile(null);
        localStorage.removeItem('currentProfile');
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

    const state = {
        profile,
        profiles,
        profile_loading
    }

    const actions = {
        clear_current_profile,
        // get_all_profiles,
        getProfiles,
        set_profile,
        getProfile,
        delete_experience,
        delete_education
    }

    return <Provider value={{ ...state, ...actions }} > {children} </Provider>
}

export { ProfileProvider, profileStore };
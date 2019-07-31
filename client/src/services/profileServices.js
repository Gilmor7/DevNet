import axios from 'axios';
//if user is authenticated all the requests will be sent with acces token

// async function that return the current profile from server
const getCurrentProfile = () => {
    return axios.get('/api/profile');
}

// async function that return all the profiles in array from server
const getAllProfiles = () => {
    return axios.get('/api/profile/all');
}


// the create profile route works for both create and update profile
const createProfile = newProfile => {
    return axios.post('/api/profile', newProfile);
}

const deleteAccount = () => {  //delete profile and user
    return axios.delete('/api/profile');
}

const addExperience = newExp => {
    return axios.post('/api/profile/experience', newExp);
}

const addEducation = newEdu => {
    return axios.post('/api/profile/education', newEdu);
}

const deleteExperience = expId => {
    return axios.delete(`api/profile/experience/${expId}`);
}

const deleteEducation = eduId => {
    return axios.delete(`api/profile/education/${eduId}`);
}

export {
    getCurrentProfile,
    createProfile,
    deleteAccount,
    addExperience,
    addEducation,
    deleteEducation,
    deleteExperience,
    getAllProfiles
};
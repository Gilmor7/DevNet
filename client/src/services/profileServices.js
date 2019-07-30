import axios from 'axios';
//if user is authenticated all the requests will be sent with acces token

const getCurrentProfile = () => {
    return axios.get('/api/profile');
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

export { getCurrentProfile, createProfile, deleteAccount, addExperience, addEducation };
import axios from 'axios';

const getCurrentProfile = () => {
    return axios.get('/api/profile');
}

const createProfile = newProfile => {
    return axios.post('/api/profile', newProfile);
}

const deleteAccount = () => {  //delete profile and user
    return axios.delete('/api/profile');
}

export { getCurrentProfile, createProfile, deleteAccount };
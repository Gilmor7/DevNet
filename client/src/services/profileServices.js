import axios from 'axios';

const getCurrentProfile = () => {
    return axios.get('/api/profile');
}

const createProfile = newProfile => {
    return axios.post('/api/profile', newProfile);
}

export { getCurrentProfile, createProfile };
import axios from 'axios';

const getCurrentProfile = () => {
    return axios.get('/api/profile');
}

export { getCurrentProfile };
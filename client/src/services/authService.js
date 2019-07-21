import axios from 'axios';

export function registerUser(newUser) {
    return axios.post('/api/users/register', newUser)
        .then(res => console.log(res.data))
}
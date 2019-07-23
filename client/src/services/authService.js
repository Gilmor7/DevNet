import axios from 'axios';

export const registerUser = newUser => {
    return axios.post('/api/users/register', newUser);
}

export const loginUser = user => {
    return axios.post('/api/users/login', user);
}

//function to save token for local storage

export const setAuthToken = token => {
    if (token) {
        //apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        //delete Auth header
        delete axios.defaults.headers.common['Authorization'];
    }


}
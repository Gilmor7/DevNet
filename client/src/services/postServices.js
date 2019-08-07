import axios from 'axios';

const getAllPosts = () => {
    return axios.get('api/posts');
}

const getPostById = postId => {
    return axios.get(`api/posts/${postId}`);
}

const createNewPost = newPost => {
    return axios.post('api/posts', newPost);
}

export { getAllPosts, createNewPost, getPostById }
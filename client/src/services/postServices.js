import axios from 'axios';

export const getAllPosts = () => {
    return axios.get('api/posts');
}

export const getPostById = postId => {
    return axios.get(`api/posts/${postId}`);
}

export const createNewPost = newPost => {
    return axios.post('api/posts', newPost);
}

export const deletePostById = postId => {
    return axios.delete(`api/posts/${postId}`, postId);
}

export const likePost = postId => {
    return axios.post(`api/posts/like/${postId}`, postId)
}

export const dislikePost = postId => {
    return axios.delete(`api/posts/unlike/${postId}`, postId)
}


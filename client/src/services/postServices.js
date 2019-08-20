import axios from 'axios';


//ajax calls for the posts feed
export const getAllPosts = () => {
    return axios.get('api/posts');
}

export const createNewPost = newPost => {
    return axios.post('api/posts', newPost);
}

export const deletePostById = postId => {
    return axios.delete(`api/posts/${postId}`);
}

export const likePost = postId => {
    return axios.post(`api/posts/like/${postId}`);
}

export const dislikePost = postId => {
    return axios.delete(`api/posts/unlike/${postId}`);
}


//ajax calls for the full post page
export const getPostById = postId => {
    return axios.get(`api/posts/${postId}`);
}

export const createComment = (postId, comment) => {
    return axios.post(`api/posts/comment/${postId}`, comment);
}

export const deleteComment = (postId, commentId) => {
    return axios.delete(`api/posts/comment/${postId}/${commentId}`);
}


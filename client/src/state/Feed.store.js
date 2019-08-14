import React, { useState, useContext, useEffect } from 'react';
// import { Redirect } from 'react-router-dom'


import {
    createNewPost,
    getAllPosts,
    deletePostById,
    likePost,
    dislikePost
} from '../services/postServices';

import { AuthContext } from './GlobalAuthContext';

const FeedStore = React.createContext();
const { Provider } = FeedStore;


const PostsProvider = ({ children, history }) => {
    // Set the feed state
    const [posts, set_posts] = useState([]);
    const [loading, set_loading] = useState(false);
    // const [likeObj, set_likeObj] = useState({
    //     disableLike: false,
    //     disableUnlike: true
    // })

    // Create post state
    const [text, set_text] = useState("");
    const [err, set_err] = useState({});

    //get user avatar and name from user info
    const { id: currentUserId, name, avatar } = useContext(AuthContext).user;

    //function that fetch all posts from DB and store them in posts state
    const getPosts = () => {
        set_loading(true)
        getAllPosts()
            .then(res => {
                set_loading(false);
                set_posts(res.data.reverse()); //reverse the array so we will see the most new one on top 
            })
            .catch(err => {
                set_loading(false);
                // if no posts the posts state will be empty array and a message will be shown 
            })
    }


    // Set the effects
    useEffect(() => {
        getPosts()  //when component did mount the fetch will be execute
    }, [])



    // Set the actions
    const onChangeText = e => {
        set_text(e.target.value)
    }


    const createPost = e => {
        e.preventDefault()
        createNewPost({
            text,
            name,
            avatar
        })
            .then(res => {
                set_text("");
                set_err({});
                set_posts([res.data, ...posts])
            })
            .catch(err => history.push(`/error-page/${err.response.data.message || 'Internal server error'}`))
    }


    const deletePost = postId => {
        deletePostById(postId)
            .then(res => {
                set_posts(posts.filter(post => post._id !== postId))
            })
            .catch(err => history.push(`/error-page/${err.response.data.message || 'Internal server error'}`))
    }

    const like = postId => {
        likePost(postId)
            .then(res => {
                set_posts(posts.map(post => {
                    if (post._id === postId) {
                        return res.data; //returned from server the updated post 
                    }
                }))
            })
            .catch(err => history.push(`/error-page/${err.response.data.message || 'Internal server error'}`))
    }

    const unlike = postId => {
        dislikePost(postId)
            .then(res => {
                set_posts(posts.map(post => {
                    if (post._id === postId) {
                        return res.data; //returned from server the updated post 
                    }
                }))
            })
            .catch(err => err => history.push(`/error-page/${err.response.data.message || 'Internal server error'}`))
    }


    const compareIdToCurrentUser = userId => {  //userId == post.user / like.user
        return userId === currentUserId;
    }


    const state = {
        loading,
        posts,
        text,
        err
    }

    const actions = {
        createPost,
        deletePost,
        onChangeText,
        like,
        unlike,
        compareIdToCurrentUser
    }

    return <Provider value={{ ...state, ...actions }} >{children}</Provider>
}

export { PostsProvider, FeedStore };



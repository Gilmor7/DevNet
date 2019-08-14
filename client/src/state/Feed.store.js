import React, { useState, useContext, useEffect } from 'react';

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


const PostsProvider = ({ children }) => {
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
                set_posts(res.data);
            })
            .catch(err => {
                set_loading(false);
                // if no posts a message will be shown 
            })
    }


    // Set the effects
    useEffect(() => {
        getPosts()
    }, [])



    // Set the actions

    const onChangeText = e => {
        set_text(e.target.value)
    }


    const createPost = e => {
        e.preventDefault()
        console.log(avatar)
        console.log(name)
        createNewPost({
            text,
            name,
            avatar
        })
            .then(res => {
                set_text("");
                set_err({});//just to make a re render 
                getPosts()
            })
            .catch(err => set_err(err.response.data))
    }


    const deletePost = postId => {
        deletePostById(postId)
            .then(res => getPosts())
            .catch(err => console.log(err.response.data))
    }

    const like = postId => {
        likePost(postId)
            .then(res => getPosts())
            .catch(err => console.log(err.response.data))
    }

    const unlike = postId => {
        dislikePost(postId)
            .then(res => getPosts())
            .catch(err => console.log(err.response.data))
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



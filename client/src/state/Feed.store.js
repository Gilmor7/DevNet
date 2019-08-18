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


const PostsProvider = ({ children, history }) => {
    // Set the feed state
    const [posts, set_posts] = useState([]);
    const [loading, set_loading] = useState(false);

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

    const createPost = (e, text, clearText, set_err) => {
        e.preventDefault()
        createNewPost({
            text,
            name,
            avatar
        })
            .then(res => {
                set_err({});
                clearText();
                set_posts([res.data, ...posts])
            })
            .catch(err => set_err(err.response.data))
    }


    const deletePost = postId => {
        deletePostById(postId)
            .then(res => {
                set_posts(posts.filter(post => post._id !== postId))
            })
            .catch(err => history.push(`/error-page`))
    }

    const like = (postId, setLikeState) => {
        likePost(postId)
            .then(res => {
                setLikeState()
            })
            .catch(err => history.push(`/error-page`))
    }

    const unlike = (postId, setLikeState) => {
        dislikePost(postId)
            .then(res => {
                setLikeState()
            })
            .catch(err => history.push(`/error-page`))
    }


    const compareIdToCurrentUser = userId => {  //userId == post.user / like.user
        return userId === currentUserId;
    }


    const state = {
        loading,
        posts
    }

    const actions = {
        createPost,
        deletePost,
        like,
        unlike,
        compareIdToCurrentUser
    }

    return <Provider value={{ ...state, ...actions }} >{children}</Provider>
}

export { PostsProvider, FeedStore };



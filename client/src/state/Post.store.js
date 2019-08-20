import React, { useState, createContext, useEffect, useContext } from "react";
import { getPostById, createComment, deleteComment } from '../services/postServices';

import { AuthContext } from './GlobalAuthContext';

const PostStore = createContext();
const { Provider } = PostStore;


const PostProvider = ({ children, match, history }) => { //get the match as a prop from router
    //destructure the postId from the params object that we get by react router 
    const { post_id } = match.params;

    // Set the post page state
    const [postData, set_postData] = useState({})
    const [loading, set_loading] = useState(false)

    //get payload from current user data
    const { id: currentUserId, name, avatar } = useContext(AuthContext).user;

    //function that gets the post from DB
    const getPost = id => {
        set_loading(true)

        getPostById(id)
            .then(res => {
                set_postData(res.data)
                set_loading(false)
            })
            .catch(err => set_loading(false))
        //if err the postData will be empty object and a message will be shown
    }

    // Set the effects 
    useEffect(() => {
        getPost(post_id);
    }, [])


    //  Set the actions to distribute

    const addComment = (e, clearText, set_err, text) => {
        e.preventDefault()

        createComment(post_id, {
            text,
            name,
            avatar
        })
            .then(res => {
                clearText();
                set_err({});
                set_postData(res.data)
            })
            .catch(err => set_err(err.response.data))
    }

    const removeComment = commentId => {
        deleteComment(post_id, commentId)
            .then(res => {
                set_postData(res.data)
            })
            .catch(err => {
                history.push(`/error-page/`)
            })

    }

    //check if current user authorized to delete comment (only post owner or comment owner)
    const deleteAuthorization = commentOwnerId => {
        if (postData.user === currentUserId) {
            return true;
        } else if (commentOwnerId === currentUserId) {
            return true;
        }
        else return false;
    }

    // Organize the state and actions 
    const state = {
        postData,
        loading
    }

    const actions = {
        addComment,
        removeComment,
        deleteAuthorization
    }

    return <Provider value={{ ...state, ...actions }}> {children} </Provider>

}

export { PostProvider, PostStore };
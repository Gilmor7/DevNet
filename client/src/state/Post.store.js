import React, { useState, createContext, useEffect } from "react";
import { getPostById, createComment, deleteComment } from '../services/postServices';

const PostStore = createContext();
const { Provider } = PostStore;


const PostProvider = ({ children, match }) => { //get the match as a prop from router
    //destructure the postId from the params object that we get by react router 
    const { post_id } = match.params;

    // Set the post page state
    const [postData, set_postData] = useState({})
    const [loading, set_loading] = useState(false)

    // Set the data for addComment component
    const [text, set_text] = useState("")
    const [err, set_err] = useState({})

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
    })


    //  Set the action to distribute
    const onChangeText = e => {
        set_text(e.target.value)
    }


    const addComment = (e, name, avatar) => {
        e.preventDefault()

        createComment(post_id, {
            text,
            name,
            avatar
        })
            .then(res => {
                set_text("");
                set_err({});
                getPost(post_id) //cause re render
            })
            .catch(err => set_err(err.response.data))
    }

    // Organize the state and actions 
    const state = {
        postData,
        loading,
        text,
        err
    }

    const actions = {
        onChangeText,
        addComment
    }

    return <Provider value={{ ...state, ...actions }}> {children} </Provider>

}

export { PostProvider, PostStore };
import React, {
    useState,
    useEffect
}
    from 'react';


import { createNewPost, getAllPosts, deletePostById, likePost, dislikePost } from '../services/postServices';

const FeedStore = React.createContext();
const { Provider } = FeedStore;


const PostsProvider = ({ children }) => {
    // Set the feed state
    const [posts, set_posts] = useState([]);
    const [loading, set_loading] = useState(false);
    const [likeObj, set_likeObj] = useState({
        disableLike: false,
        disableUnlike: true
    })

    // Create post state
    const [text, set_text] = useState("");
    const [err, set_err] = useState({});

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


    const createPost = (e, name, avatar) => {
        e.preventDefault()

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
        unlike
    }

    return <Provider value={{ ...state, ...actions }} >{children}</Provider>
}

export { PostsProvider, FeedStore };



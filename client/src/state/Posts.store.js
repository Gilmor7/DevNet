import React, {
    useContext,
    useState,
    useEffect
}
    from 'react';

import { profileStore } from './Profile.store';

import { createNewPost, getAllPosts } from '../services/postServices';

const FeedStore = React.createContext();
const { Provider } = FeedStore;


const PostsProvider = ({ children }) => {
    // Set the posts state
    const [posts, set_posts] = useState([]);
    // const [current_post, set_current_post] = useState({});
    const [loading, set_loading] = useState(false);

    const { profile } = useContext(profileStore);


    // Set the effects
    useEffect(() => {
        set_loading(true)
        getAllPosts()
            .then(res => {
                set_loading(false);
                set_posts(res.data);
                console.log(res.data)
            })
            .catch(err => {
                set_loading(false);
                // global error handler
            })
    }, [])


    //set the actions
    const createPost = (text, set_err) => {
        createNewPost({
            text,
            name: profile.user.name,
            avatar: profile.user.avatar
        })
            .then(res => {
                console.log(res.data)
                set_err({})
            })
            .catch(err => set_err(err.response.data))
    }

    const state = {
        loading,
        posts
    }

    const actions = {
        createPost
    }

    return <Provider value={{ ...state, ...actions }} >{children}</Provider>
}

export { PostsProvider, FeedStore };



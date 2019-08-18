import React, { useContext } from 'react';

import Spinner from '../view/Spinner';
import CreatePost from './CreatePost';
import AllPosts from './AllPosts';

import { FeedStore, PostsProvider } from '../../state/Feed.store';


const PostsFeed = () => {

    const { createPost, loading, posts, deletePost, like, unlike, compareIdToCurrentUser } = useContext(FeedStore);

    let postsFeed = null;

    if (posts.length > 0) {
        postsFeed = <AllPosts
            postsArr={posts}
            deletePost={deletePost}
            like={like}
            unlike={unlike}
            compareIdToCurrentUser={compareIdToCurrentUser}
        />
    }
    else postsFeed = <p> No Posts Found </p>;


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <CreatePost createPost={createPost} />
                    {!loading ? postsFeed : <Spinner />}
                </div>
            </div>
        </div>
    )
}

const connected = props => (
    <PostsProvider {...props}>
        <PostsFeed />
    </PostsProvider>
)



export default connected;

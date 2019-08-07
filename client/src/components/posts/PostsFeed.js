import React, { useContext } from 'react';

import PostView from './PostView';
import Spinner from '../view/Spinner';
import CreatePost from './CreatePost';

import { FeedStore } from '../../state/Posts.store';

const PostsFeed = () => {

    const { loading, posts } = useContext(FeedStore);

    let postsFeed;

    if (posts.length > 0) {
        postsFeed = posts.map(post => (
            <PostView
                key={post._id}
                numLikes={post.likes.length}
                {...post}

            />
        ))
    }
    else postsFeed = "There are no posts Yet";


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <CreatePost />
                    {!loading ? postsFeed : <Spinner />}
                </div>
            </div>
        </div>


    )
}

export default PostsFeed;

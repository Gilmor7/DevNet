import React, { useContext } from 'react';

import PostView from './PostView';
import Spinner from '../view/Spinner';
import CreatePost from './CreatePost';

import { FeedStore, PostsProvider } from '../../state/Feed.store';
import { profileStore } from '../../state/Profile.store';

const PostsFeed = () => {

    const { profile } = useContext(profileStore);
    const { loading, posts, deletePost, like, unlike } = useContext(FeedStore);

    let postsFeed;

    if (posts.length > 0) {
        postsFeed = posts.map(post => {
            const { likes, comments, ...copy } = post
            const owner = post.user === profile.user._id //boolean - is the user is post owner?
            const disableLike = likes.map(like => like.user)
                .filter(userId => userId === profile.user._id)
            return (
                <PostView
                    key={post._id}
                    likePost={() => like(post._id)}
                    unlikePost={() => unlike(post._id)}
                    numLikes={likes.length}
                    {...copy}
                    owner={owner}
                    onDelete={owner ? () => deletePost(post._id) : null}
                    disableLike={disableLike.length > 0}
                />
            )

        })
    }
    else postsFeed = "There are no posts to show";


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <CreatePost name={profile.name} avatar={profile.avatar} />
                    {!loading ? postsFeed : <Spinner />}
                </div>
            </div>
        </div>
    )
}

const connected = () => (
    <PostsProvider>
        <PostsFeed />
    </PostsProvider>
)



export default connected;

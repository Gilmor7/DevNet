import React, { useContext } from 'react';

import PostView from './PostView';
import Spinner from '../view/Spinner';
import CreatePost from './CreatePost';

import { FeedStore, PostsProvider } from '../../state/Feed.store';


const PostsFeed = () => {

    const { loading, posts, deletePost, like, unlike, compareIdToCurrentUser } = useContext(FeedStore);

    let postsFeed = null;

    if (posts.length > 0) {
        postsFeed = posts.map(post => {
            const { likes, comments, ...copy } = post
            const IsPostOwner = compareIdToCurrentUser(post.user) //boolean - is the user is post Owner?
            const disableLike = likes.map(like => like.user)
                .filter(userId => compareIdToCurrentUser(userId));

            return (
                <PostView
                    key={post._id}
                    likePost={() => like(post._id)}
                    unlikePost={() => unlike(post._id)}
                    numLikes={likes.length}
                    {...copy}
                    owner={IsPostOwner}
                    onDelete={IsPostOwner ? () => deletePost(post._id) : null}
                    disableLike={disableLike.length > 0}
                />
            )

        })
    }
    else postsFeed = <p> No Posts Found </p>;


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

const connected = props => (
    <PostsProvider {...props}>
        <PostsFeed />
    </PostsProvider>
)



export default connected;

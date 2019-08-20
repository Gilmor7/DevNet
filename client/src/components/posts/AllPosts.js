import React from 'react';
import PropTypes from 'prop-types';

import PostView from './PostView';

const AllPosts = ({ postsArr, like, unlike, deletePost, compareIdToCurrentUser }) => {
    return (
        postsArr.map(post => {
            const { likes, comments, ...copy } = post;
            const IsPostOwner = compareIdToCurrentUser(post.user);//boolean - is the user is post Owner?
            let disableLike;

            if (likes.length > 0) {
                const alreadyLiked = likes.map(like => like.user)
                    .filter(userId => compareIdToCurrentUser(userId));

                disableLike = alreadyLiked.length > 0 ? true : false;
            }
            else disableLike = false;

            return (
                <PostView
                    key={post._id}
                    likePost={like}
                    unlikePost={unlike}
                    numLikes={likes.length}
                    {...copy}
                    owner={IsPostOwner}
                    onDelete={IsPostOwner ? deletePost : null}
                    disableLike={disableLike}
                />
            )

        })
    )
}

AllPosts.propTypes = {
    postsArr: PropTypes.array.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    compareIdToCurrentUser: PropTypes.func.isRequired
}


export default AllPosts;

import React from 'react';
import PropTypes from 'prop-types';

import PostItem from './PostItem';

const CommentsFeed = ({ comments, deleteAuthCheck, deleteComment }) => {
    return (
        <div>
            {
                comments.map(com => (
                    <PostItem
                        key={com._id}
                        {...com}
                        deleteAuthorized={deleteAuthCheck(com.user)}
                        onDelete={deleteComment}
                    />
                ))
            }
        </div>
    )
}

CommentsFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    deleteAuthCheck: PropTypes.func.isRequired,
    deleteComment: PropTypes.func,
}

export default CommentsFeed;

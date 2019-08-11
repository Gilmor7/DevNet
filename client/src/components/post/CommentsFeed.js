import React from 'react'
import PropTypes from 'prop-types'

import PostItem from './PostItem';

const CommentsFeed = ({ comments }) => {
    return (
        <div>
            {
                comments.map(com => (
                    <PostItem {...com} />
                ))
            }
        </div>
    )
}

CommentsFeed.propTypes = {
    comments: PropTypes.array.isRequired
}

export default CommentsFeed;

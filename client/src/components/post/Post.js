import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import isEmpty from '../../utils/isEmpty';

import { PostStore, PostProvider } from '../../state/Post.store';

import PostItem from './PostItem';
import AddComment from './AddComment';
import CommentsFeed from './CommentsFeed';
import Spinner from '../view/Spinner';

const Post = () => {

    const { postData, loading, deleteAuthorization, removeComment } = useContext(PostStore);

    let content = null;

    if (loading === true) {
        content = <Spinner />;
    } else if (isEmpty(postData)) {
        content = <h3> Post not found </h3>
    }
    else content = (
        <React.Fragment>
            <PostItem {...postData} isPost={true} />
            <hr className="p-0.5 bg-secondary" />
            {postData.comments.length > 0 &&
                <CommentsFeed
                    comments={postData.comments}
                    deleteAuthCheck={deleteAuthorization}
                    deleteComment={removeComment}
                />}
            <AddComment />
        </React.Fragment>
    )

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/feed" className="btn btn-light mb-4">
                        Go Back
                    </Link>

                    {content}

                </div>
            </div>
        </div>

    )
}


const connected = ({ match }) => (
    <PostProvider match={match}>
        <Post />
    </PostProvider>
)

export default connected;

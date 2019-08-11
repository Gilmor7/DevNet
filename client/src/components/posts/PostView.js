import React from 'react'
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const PostView = ({ text, avatar, numLikes, name: author, _id, owner, onDelete, likePost, unlikePost, disableLike }) => {

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    {/* <Link to="/profile"> */}
                    <img className="rounded-circle d-none d-md-block" src={avatar}
                        alt="" />
                    {/* </Link> */}
                    <br />
                    <p className="text-center">{author}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{text}</p>
                    <button
                        onClick={likePost}
                        disabled={disableLike}
                        type="button"
                        className="btn btn-light mr-1">
                        <i className="text-info fas fa-thumbs-up"></i>
                        {numLikes > 0 && <span className="badge badge-light">{numLikes}</span>}
                    </button>
                    <button
                        onClick={unlikePost}
                        disabled={!disableLike}
                        type="button"
                        className="btn btn-light mr-1">
                        <i className="text-secondary fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${_id}`} className="btn btn-info mr-1">
                        Comments
                   </Link>
                    {owner && <button
                        type="button"
                        onClick={onDelete}
                        className="btn btn-danger mr-1">
                        Delete </button>}

                </div>
            </div>
        </div>
    )
}

PostView.propTypes = {
    text: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    numLikes: PropTypes.number.isRequired,
    name: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.bool.isRequired,
    onDelete: PropTypes.func,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    disableLike: PropTypes.bool.isRequired
}

export default PostView;

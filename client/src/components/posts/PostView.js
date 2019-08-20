import React, { useState } from 'react'
import { Link } from 'react-router-dom';


import PropTypes from 'prop-types';
import SpinnerSmall from '../view/SpinnerSmall';

const PostView = ({ text, avatar, numLikes, name: author, _id, owner, onDelete, likePost, unlikePost, disableLike }) => {

    const [likeState, set_likeState] = useState({
        liked: disableLike,
        num: numLikes
    })

    const [loading, set_loading] = useState(false)



    const likeToPost = () => {
        set_likeState({
            liked: true,
            num: likeState.num + 1
        })
    }

    const dislikeToPost = () => {
        set_likeState({
            liked: false,
            num: likeState.num - 1
        })
    }

    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <img className="rounded-circle d-none d-md-block" src={avatar}
                        alt="" />
                    <br />
                    <p className="text-center">{author}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{text}</p>
                    <button
                        onClick={() => likePost(_id, likeToPost)}
                        disabled={likeState.liked}
                        type="button"
                        className="btn btn-light mr-1">
                        <i className="text-info fas fa-thumbs-up"></i>
                        {likeState.num > 0 && <span className="badge badge-light">{likeState.num}</span>}
                    </button>
                    <button
                        onClick={() => unlikePost(_id, dislikeToPost)}
                        disabled={!likeState.liked}
                        type="button"
                        className="btn btn-light mr-1">
                        <i className="text-secondary fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/post/${_id}`} className="btn btn-info mr-1">
                        Comments
                   </Link>
                    {owner && <button
                        type="button"
                        onClick={() => onDelete(_id, set_loading)}
                        className="btn btn-danger mr-1">
                        Delete </button>}
                    {loading ? <SpinnerSmall /> : null}

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

import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import SpinnerSmall from '../view/SpinnerSmall';


const PostItem = ({ name, avatar, text, isPost, _id, deleteAuthorized, onDelete }) => {

    const [loading, set_loading] = useState(false);

    return (
        <div className={classnames("card card-body mb-3", {
            'bg-info text-white': isPost
        })}>
            <div className="row">
                <div className="col-md-2">

                    <img
                        src={avatar}
                        alt=""
                        className="rounded-circle d-none d-md-block"
                    />

                    <br />
                    <p className="text-center">{name}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{text}</p>

                    {deleteAuthorized &&
                        <button
                            className="btn btn-danger"
                            onClick={() => onDelete(_id, set_loading)}
                        >Delete</button>}
                    {loading ? <SpinnerSmall /> : null}
                </div>
            </div>
        </div>
    )
}

PostItem.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default PostItem;

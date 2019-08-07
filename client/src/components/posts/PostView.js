import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const PostView = ({ text, avatar, numLikes, name: author }) => {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    <a href="profile.html">
                        <img className="rounded-circle d-none d-md-block" src={avatar}
                            alt="" />
                    </a>
                    <br />
                    <p className="text-center">{author}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{text}</p>
                    <button type="button" className="btn btn-light mr-1">
                        <i className="text-info fas fa-thumbs-up"></i>
                        {numLikes > 0 && <span className="badge badge-light">{numLikes}</span>}
                    </button>
                    <button type="button" className="btn btn-light mr-1">
                        <i className="text-secondary fas fa-thumbs-down"></i>
                    </button>
                    <Link to="/post" className="btn btn-info mr-1">
                        Comments
            </Link>
                </div>
            </div>
        </div>
    )
}

PostView.propTypes = {
}

export default PostView

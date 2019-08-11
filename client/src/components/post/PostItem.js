import React from 'react'
import PropTypes from 'prop-types'


const PostItem = ({ name, avatar, text }) => {
    return (
        <div className="card card-body mb-3">
            <div className="row">
                <div className="col-md-2">
                    {/* <a href="profile.html"> */}
                    <img
                        src={avatar}
                        alt=""
                        className="rounded-circle d-none d-md-block"
                    />
                    {/* </a> */}
                    <br />
                    <p className="text-center">{name}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{text}</p>
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

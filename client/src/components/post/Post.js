import React from 'react'
import { Link } from 'react-router-dom'


const Post = ({ match }) => {
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-12">

                    <Link to="/feed" className="btn btn-light">
                        Go Back
                        </Link>
                    hello this is post id: {match.params.post_id}
                </div>
            </div>
        </div>
    )
}

export default Post

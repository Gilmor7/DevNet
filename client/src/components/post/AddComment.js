import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { PostStore } from '../../state/Post.store';

import TextAreaField from '../view/TextAreaField'

const AddComment = ({ name, avatar }) => {

    const { text, err, onChangeText, addComment } = useContext(PostStore)

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Say Somthing...
</div>
                <div className="card-body">
                    <form noValidate onSubmit={e => addComment(e, name, avatar)}>
                        <div className="form-group">
                            <TextAreaField
                                name="text"
                                value={text}
                                placeholder="Add a comment"
                                onChange={onChangeText}
                                error={err ? err.text : null}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

AddComment.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
}

export default AddComment

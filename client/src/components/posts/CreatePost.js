import React, { useState, useContext } from 'react';

import { FeedStore } from '../../state/Posts.store';

import TextAreaField from '../view/TextAreaField';

const CreatePost = () => {

    const [text, set_text] = useState("");
    const [err, set_err] = useState({});

    const { createPost } = useContext(FeedStore);

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Say Somthing...
          </div>
                <div className="card-body">
                    <form noValidate onSubmit={e => {
                        e.preventDefault();
                        createPost(text, set_err);
                        set_text("");
                    }}>

                        <TextAreaField
                            placeholder="Create a post"
                            name="text"
                            value={text}
                            error={err.text || null}
                            onChange={e => set_text(e.target.value)}
                        />

                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost

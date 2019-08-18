import React, { useState } from 'react';

import isEmpty from '../../utils/isEmpty'

import TextAreaField from '../view/TextAreaField';

const CreatePost = ({ createPost }) => {
    const [text, set_text] = useState('');
    const [err, set_err] = useState({});

    const onChangeText = e => {
        set_text(e.target.value);
    }
    const clearText = () => {
        set_text('');
    }

    return (
        <div className="post-form mb-3">
            <div className="card card-info">
                <div className="card-header bg-info text-white">
                    Say Somthing...
                 </div>
                <div className="card-body">
                    <form noValidate onSubmit={e => createPost(e, text, clearText, set_err)}>

                        <TextAreaField
                            placeholder="Create a post"
                            name="text"
                            value={text}
                            error={err ? err.text : null}
                            onChange={onChangeText}
                        />

                        {!isEmpty(err) && !err.text ? <p>Something went wrong , please try submit the post again</p> : null}

                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;

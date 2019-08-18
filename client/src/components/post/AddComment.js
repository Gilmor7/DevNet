import React, { useState } from 'react';

import TextAreaField from '../view/TextAreaField';

const AddComment = ({ AddNewComment }) => {

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
            <div className="card card-dark">
                <div className="card-header bg-info text-white">
                    Say Somthing...
</div>
                <div className="card-body">
                    <form noValidate onSubmit={e => AddNewComment(e, clearText, set_err, text)}>
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


export default AddComment;

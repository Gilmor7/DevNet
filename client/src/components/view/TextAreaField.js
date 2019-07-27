import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const TextAreaField = ({
    name,
    placeholder,
    value,
    onChange,
    info,
    error

}) => {
    return (
        <div className="form-group">
            <textarea
                className={classnames("form-control form-control-lg", {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
            />
            {error && (<div className="invalid-feedback" >{`${name.charAt(0).toUpperCase() + name.slice(1)} ${error}`}</div>)}
            {info && <small className="form-text text-muted">{info}</small>}

        </div>
    )
}


TextAreaField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    info: PropTypes.string,
    error: PropTypes.string
}


export default TextAreaField;

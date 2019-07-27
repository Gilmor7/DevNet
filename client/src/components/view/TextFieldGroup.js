import React from 'react';
import classnames from 'classnames'
//proptypes

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    type,
    info,
    errorIsJoi,
    error,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input
                className={classnames("form-control form-control-lg", {
                    'is-invalid': error
                })}
                type={type}
                name={name}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && (<div className="invalid-feedback" >{errorIsJoi ? `${name.charAt(0).toUpperCase() + name.slice(1)} ${error}` : error}</div>)}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    )
}

export default TextFieldGroup;

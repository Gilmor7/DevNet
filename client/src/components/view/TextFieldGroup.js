import React from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types';


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
            {error && (<div className="invalid-feedback" >
                {
                    errorIsJoi ?
                        `${placeholder ? placeholder : name.charAt(0).toUpperCase() + name.slice(1)} field ${error}`
                        : error
                }
            </div>)}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    )
}


TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    info: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    disabled: PropTypes.bool,
    errorIsJoi: PropTypes.bool
}


export default TextFieldGroup;

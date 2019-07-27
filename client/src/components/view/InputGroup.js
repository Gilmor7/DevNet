import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const InputGroup = ({
    name,
    placeholder,
    value,
    onChange,
    error,
    icon

}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input
                type="text"
                className={classnames("form-control form-control-lg", {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
            />
            {error && (<div className="invalid-feedback" >{`${name.charAt(0).toUpperCase() + name.slice(1)} ${error}`}</div>)}
        </div>
    )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.string.isRequired
}


export default InputGroup;

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectFieldGroup = ({
    name,
    value,
    onChange,
    info,
    error,
    options
}) => {

    const selectOptions = options.map(opt => (
        <option
            key={opt.label}
            value={opt.value}>
            {opt.label} </option>
    ));

    return (
        <div className="form-group">
            <select
                className={classnames("form-control form-control-lg", {
                    'is-invalid': error
                })}
                value={value}
                name={name}
                onChange={onChange}
            >
                {selectOptions}
            </select>
            {error && (<div className="invalid-feedback" >{`${name.charAt(0).toUpperCase() + name.slice(1)} ${error}`}</div>)}
            {info && <small className="form-text text-muted">{info}</small>}
        </div>
    )
}


SelectFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.array.isRequired
}

export default SelectFieldGroup;

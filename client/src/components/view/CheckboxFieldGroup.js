import React from 'react'
import PropTypes from 'prop-types'

const CheckboxFieldGroup = ({ id, name, value, onChange, info }) => {
    return (
        <div className="form-check mb-4">
            <input onChange={onChange}
                className="form-check-input"
                id={id}
                type="checkbox"
                name={name}
                value={value}
            />
            <label className="form-check-label" htmlFor={id}>
                {info}
            </label>
        </div>
    )
}

CheckboxFieldGroup.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    info: PropTypes.string.isRequired
}

export default CheckboxFieldGroup

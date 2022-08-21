import React from 'react';
import Proptypes from 'prop-types';

const Checkbox = ({ name, checked, label, value, onChange }) => {
    const inputProps = {
        type: 'checkbox',
        name,
        id: name,
        value,
        onChange,
        checked
    }
    return(
        <div>
        {label && <label htmlFor={name}>{label}</label>}
        <input
        {...inputProps}
        />
        </div>
    )
}

export default Checkbox

Checkbox.propTypes = {
    name: Proptypes.string.isRequired,
    checked: Proptypes.bool.isRequired,
    onChange: Proptypes.func.isRequired,
    label: Proptypes.string
}

Checkbox.defaultProps = {
    value: ''
}
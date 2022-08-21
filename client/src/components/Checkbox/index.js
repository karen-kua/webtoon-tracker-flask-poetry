import React from 'react';

const Checkbox = ({ name, checked, label, value = '', onChange }) => {
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
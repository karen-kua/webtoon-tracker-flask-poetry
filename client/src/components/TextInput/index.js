import React from 'react';

const TextInput = ({ name, isRequired, label, value = '', onChange }) => {
    const inputProps = {
        type: 'text',
        name,
        id: name,
        value,
        required: isRequired,
        onChange
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

export default TextInput
import React from 'react';
import TextInput from '../TextInput';

const ListTextInputs = ({list, field, title, onChange, onDelete, onAdd}) => {
    return (
        <div>
        <div>{title}</div>
        {list.length > 0 && list.map((item, index) => {
        const name = `${field}_${index+1}`;
        const label = `${field} #${index+1}`;
        return (
            <div className="form__list">
            <TextInput
            key={name}
            label={label}
            name={name}
            value={item}
            onChange={e => onChange(e, index)}
            isRequired
            />
            {index > 0 ? <button onClick={() => onDelete(field, index)}>Delete</button>: null}
            </div>
        )
    })}
        <button onClick={() => onAdd(field)}>Add</button>
    </div>
    )
}
export default ListTextInputs;
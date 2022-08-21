import React, { useState, useCallback } from 'react';
import Checkbox from '../Checkbox';
import ListTextInputs from '../ListTextInputs';
import TextInput from '../TextInput';
import "./Modal.css";

const initialForm = {
    title: '',
    authors: [''],
    genres: [''],
    daysOfRelease: [],
    completed: false,
    dropped: false
}

const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
];

const Modal = ({ header, closeModal }) => {
    const [formValues, setFormValues] = useState(initialForm)

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Karen submitted values: ', formValues)
    }

    const handleOnTextChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        const updatedValues = {
            ...formValues,
            [name]: value
        }
        setFormValues(updatedValues);
    }

    const handleOnListTextChange = (e, index) => {
        e.preventDefault();
        console.log('Karen e: ', e);
        console.log('Karen index: ', index);
        const { name, value } = e.target;
        const field = name.split('_')[0]
        const updatedList = [...formValues[field]]
        updatedList[index] = value;
        const updatedValues = {
            ...formValues,
            [field]: updatedList
        }
        setFormValues(updatedValues);
    }

    const deleteEntry = (field, index) => {
        console.log('Karen index: ', index, field)
        const updatedList = [...formValues[field]]
        console.log('Karen updatedList: ', updatedList);
        updatedList.splice(index, 1)
        setFormValues({
            ...formValues,
            [field]: updatedList
        });
    }

    const addEntry = (field) => {
        console.log('Karen field: ', field)
        const updatedList = [...formValues[field], '']
        setFormValues({
            ...formValues,
            [field]: updatedList
        });
    };
    console.log('Karen formValues: ', formValues);


return (
    <div id="modalOverlay">
        <div className="modal">
            <div className="modal__close__container">
            <button onClick={closeModal}>x</button>
            </div>
            <div className="modal__header">
            <h1>{header}</h1>
            </div>
            <div className="modal__content">
        <form onSubmit={handleSubmit}>
            <TextInput
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleOnTextChange}
            isRequired
            />
            <ListTextInputs
            list={formValues.authors}
            field="authors"
            title="Authors"
            onChange={handleOnListTextChange}
            onDelete={deleteEntry}
            onAdd={addEntry}
            />
            <ListTextInputs
            list={formValues.genres}
            field="genres"
            title="Genres"
            onChange={handleOnListTextChange}
            onDelete={deleteEntry}
            onAdd={addEntry}
            />
            {daysOfWeek.map((day, index) => {
                return(
                <>
                <Checkbox
                key={`${day}_${index}`}
                name={day}
                label={day}
                day={day}
                value={day}
                checked={false}
                onChange={()=>console.log('Karen is checking')}
                />
                </>
                )
            })
            }
            <button onSubmit={handleSubmit}>Submit</button>
        </form>
            </div>
        </div>
    </div>
)};

export default Modal;
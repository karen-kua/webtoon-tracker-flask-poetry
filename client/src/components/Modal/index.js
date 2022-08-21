import React, { useState, Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneWebtoon } from '../../action-creators/webtoons';
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

const checkFormValues = formValues => {
    let errMsg = '';
    const copyOfValues = {...formValues};
    const keyAndValues = Object.entries(copyOfValues);
    keyAndValues.map(([key, value]) => {
        if (typeof value === 'string' && value.length === 0) {
            errMsg = `${key} is empty!`;
        } else if (typeof value === 'undefined') {
            errMsg = `${key} is undefined!`;
        } else if (Array.isArray(value) && value.length === 0) {
            errMsg = `${key} is empty!`;
        }
    })
    return [errMsg ? false: true, errMsg]
}

const Modal = ({ header, closeModal }) => {
    const [formValues, setFormValues] = useState(initialForm)
    const [formError, setFormError] = useState('');
    const dataError = useSelector(state => state.webtoons.error);
    const dispatch = useDispatch();


    const handleSubmit = e => {
        e.preventDefault();
        console.log('Karen submitted values: ', formValues);
        const [isFormValid, errMsg] = checkFormValues(formValues);
        console.log('Karen isFormValid: ', isFormValid);
        console.log('Karen errMsg: ', errMsg);
        if (isFormValid) {
            dispatch(addOneWebtoon(formValues))
        } else {
            setFormError(errMsg)
        }
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
        const updatedList = [...formValues[field]]
        updatedList.splice(index, 1)
        setFormValues({
            ...formValues,
            [field]: updatedList
        });
    }

    const addEntry = (field) => {
        const updatedList = [...formValues[field], '']
        setFormValues({
            ...formValues,
            [field]: updatedList
        });
    };

    const toggleDaysOfRelease = (e, index, field) => {
        const { value, checked } = e.target;
        const updatedList = [...formValues[field]];
        if (checked) {
            updatedList.push(value)
        } else {
            updatedList.splice(index, 1);
        }
        setFormValues({
            ...formValues,
            [field]: updatedList

        })
    }

    const toggleCheckbox = e => {
        const { value, checked } = e.target;
        setFormValues({
            ...formValues,
            [value]: checked
        })
    }
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
            <div>Days of Release</div>
            {daysOfWeek.map((day, index) => {
                return(
                <Fragment key={`${day}_${index}`}>
                <Checkbox
                name={day}
                label={day}
                value={day}
                checked={formValues.daysOfRelease.includes(day)}
                onChange={e => toggleDaysOfRelease(e, index, 'daysOfRelease')}
                />
                </Fragment>
                )
            })
            }
            <Checkbox
            name="completed"
            label="Completed"
            value="completed"
            checked={formValues.completed}
            onChange={toggleCheckbox}
            />
            <Checkbox
            name="dropped"
            label="Dropped"
            value="dropped"
            checked={formValues.dropped}
            onChange={toggleCheckbox}
            />
            <button onSubmit={handleSubmit}>Submit</button>
            {dataError && <div>An error occurred: {dataError}</div>}
            {formError && <div>An error occurred: {formError}</div>}
        </form>
            </div>
        </div>
    </div>
)};

export default Modal;
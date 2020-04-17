import React, {useState} from "react";

function useFormValidation(initialState) {
    const [values, setValues] = useState(initialState);

    function handleChange(event) {
        event.persist();
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log({values});
    }

    return { handleSubmit, handleChange, values}
}

export default useFormValidation;

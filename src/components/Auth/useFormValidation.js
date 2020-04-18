import {useState, useEffect} from "react";

function useFormValidation(initialState, validate) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);


    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                console.log("authenticate users", values);
                setSubmitting(false);
            } else {
             setSubmitting(false);
            }
        }
    }, [errors, isSubmitting, values]);


    function handleChange(event) {
        event.persist();
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }))
    }

    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }


    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
        console.log({values});
    }

    return { handleSubmit, handleBlur, handleChange, values, errors, isSubmitting}
}

export default useFormValidation;

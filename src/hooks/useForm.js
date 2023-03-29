import { useState } from 'react';

export default function useForm({
    initialValues,
    customValidations,
    onSubmit,
}) {
    const [data, setData] = useState(initialValues || {});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorCode, setErrorCode] = useState(null);

    const handleChange = (key) => (e) => {
        const isCheckbox = e.target.type === 'checkbox';
        let value = isCheckbox ? e.target.checked : e.target.value;

        //multiple checkboxes
        if (isCheckbox && Array.isArray(data[key])) {
            value = data[key].map((el) =>
                e.target.name === el.name ? { ...el, checked: value } : el
            );
            setData({ ...data, [key]: value });
        } else {
            setData({
                ...data,
                [key]: value,
            });
        }

        // validate if error already present
        const customError = customValidations?.[key]?.isValid(value)
            ? ''
            : customValidations?.[key]?.message;

        if (errors[key]) {
            setErrors({
                ...errors,
                [key]: customError || e.target.validationMessage,
            });
        }
    };

    const getCustomErrors = () => {
        if (!customValidations) return;
        let customErrors = {};
        for (let [key, validation] of Object.entries(customValidations)) {
            if (!validation.isValid(data[key]))
                customErrors[key] = validation.message;
        }
        return customErrors;
    };

    const handleInvalid = (key) => (e) => {
        e.preventDefault();
        const customErrors = getCustomErrors() || {};
        setErrors({
            ...errors,
            [key]: e.target.validationMessage,
            ...customErrors,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const customErrors = getCustomErrors() || {};
        if (Object.values(customErrors).some((value) => value))
            return setErrors({ ...errors, ...customErrors });

        setIsSubmitting(true);
        Promise.resolve(onSubmit(data))
            .catch((error) => {
                setErrorCode(error.code);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return {
        data,
        isSubmitting,
        errors,
        errorCode,
        handleChange,
        handleSubmit,
        handleInvalid,
    };
}

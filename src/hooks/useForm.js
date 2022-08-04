import { useState } from 'react';

export default function useForm({ initialValues, validations, onSubmit }) {
	const [data, setData] = useState(initialValues || {});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const [errorCode, setErrorCode] = useState(null);

	const handleChange = (key) => (e) => {
		setData({ ...data, [key]: e.target.value });
	};

	const getErrorMessage = (key, value) => {
		if (!validations?.[key]) return null;
		const { required, pattern, custom } = validations[key];

		switch (true) {
			case required && !value:
				return 'This field is required';
			case pattern && !RegExp(pattern.value).test(value):
				return pattern.message;
			case custom && !custom.isValid(data):
				return custom.message;
			default:
				return null;
		}
	};
	const handleBlur = (key) => (e) => {
		setErrors({ ...errors, [key]: getErrorMessage(key, e.target.value) });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let errors = {};
		for (let [key, value] of Object.entries(data)) {
			errors[key] = getErrorMessage(key, value);
		}

		if (Object.values(errors).some((value) => value !== null))
			return setErrors(errors);

		setIsSubmitting(true);
		Promise.resolve(onSubmit(data))
			.catch((error) => {
				setErrorCode(error.code);
			})
			.finally(() => setIsSubmitting(false));
	};

	return {
		data,
		isSubmitting,
		errors,
		errorCode,
		handleChange,
		handleBlur,
		handleSubmit,
	};
}

import { useState } from "react";

export default function useForm(form, callback) {
	const [values, setValues] = useState(form);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		if (e.target.type === "select-one") handleSelect(e);
		else handleText(e);
	};

	const handleSelect = (e) => {
		const { name, value } = e.target;

		const newValues = { ...values };
		newValues.select[name].value = value;
		setValues(newValues);
	};

	const handleText = (e) => {
		const { name, value } = e.target;

		const newValues = { ...values };
		newValues.text[name] = value;
		setValues(newValues);
	};

	const handleSubmit = () => {
		const tmpErrors = getErrors();
		setErrors(tmpErrors);

		const hasErrors = Object.keys(tmpErrors).length !== 0;
		if (!hasErrors) {
			callback();
			reset();
		}
	};

	const getErrors = () => {
		const tmpErrors = {};

		for (let field in values.text) {
			if (values.text[field] === "") {
				tmpErrors[field] = `${field} is required`;
			}
		}
		return tmpErrors;
	};

	const reset = () => {
		const newValues = { ...values };

		for (let field in newValues.text) {
			newValues.text[field] = "";
		}
		setValues(newValues);
	};

	return { values, errors, handleChange, handleSubmit };
}

import { useState } from "react";

const defaultValues = { text: {}, select: {}, checkbox: {} };

export default function useForm(form = defaultValues, callback) {
	const [values, setValues] = useState(form);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const type = e.target.type;
		if (type === "select-one") handleSelect(e);
		else if (type === "text" || type === "number") handleText(e);
		else if (type === "checkbox") handleCheckbox(e);
		else console.log(`${type} not found`);
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

	const handleCheckbox = (e) => {
		const { name, checked } = e.target;

		const newValues = { ...values };
		newValues.checkbox[name] = checked;
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

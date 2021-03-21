import React from "react";

import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import AddButton from "../Components/AddButton";

import useForm from "../useForm.js";
import useIpc from "../useIpc.js";
import { channels } from "../shared/Channels";

export default function AddNewCard(props) {
	const { ipcConstructor, ipcSend } = useIpc(false);
	const decks = ipcConstructor(channels.GET_DECKS);
	const initialState = getInitialState(decks);

	// Sends the card to the main process
	const addNewCard = () => {
		const cardObject = {
			deck: select.value,
			type: "Basic Card",
			fields: values.text,
			state: "new",
		};
		ipcSend(channels.ADD_NEW_CARD, cardObject);
	};

	// Handle the form's basic functionalities
	const { values, errors, handleChange, handleSubmit } = useForm(
		initialState,
		addNewCard
	);

	const getTextInputs = () => {
		const { text } = values;
		const fields = [];

		for (let field in text) {
			fields.push(
				<TextInput
					name={field}
					value={text[field]}
					label={field}
					onChange={handleChange}
					error={errors[field] ? errors[field] : undefined}
					key={field}
				/>
			);
		}
		return fields;
	};

	const styles = {
		selectField: {
			width: "100%",
			display: "flex",
			justifyContent: "space-around",
			marginBottom: "16px",
		},
	};

	const select = values.select.Deck;
	return (
		<div>
			<div style={styles.selectField}>
				<SelectInput
					name={select.name}
					label={select.name}
					options={select.options}
					selected={select.value}
					onChange={handleChange}
				/>
			</div>
			<div>{getTextInputs()}</div>
			<AddButton onClick={handleSubmit} label="Add Card" />
		</div>
	);
}

const getInitialState = (decks) => {
	return {
		select: { Deck: { name: "Deck", value: decks[0], options: decks } },
		text: { Front: "", Back: "" },
	};
};

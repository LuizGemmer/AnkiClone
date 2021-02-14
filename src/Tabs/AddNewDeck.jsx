import React from "react";

import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import AddButton from "../Components/AddButton";

import useForm from "../useForm.js";
import { channels } from "../Channels";
const { ipcRenderer } = window.require("electron");

let state = getState();

export default function AddNewDeck() {
	const addNewDeck = () => {
		const deckObject = {
			name: values.text.deckName,
			deckConfig: values.select.deckConfig.value,
		};
		ipcRenderer.send(channels.ADD_NEW_DECK, deckObject);
	};
	const { values, errors, handleChange, handleSubmit } = useForm(
		state,
		addNewDeck
	);

	return (
		<React.Fragment>
			<TextInput
				name="deckName"
				value={values.text.deckName}
				label="Deck Name"
				onChange={handleChange}
				error={errors.deckName ? errors.deckName : undefined}
			/>
			<SelectInput
				label="Deck Configuration"
				name="deckConfig"
				onChange={handleChange}
				Selected={values.select.deckConfig.value}
				options={values.select.deckConfig.options}
			/>
			<AddButton label="Add Deck" onClick={handleSubmit} />
		</React.Fragment>
	);
}

function getState() {
	return {
		select: {
			deckConfig: {
				options: ["Dummy 1", "Dummy 2"],
				value: "Dummy 1",
			},
		},
		text: {
			deckName: "",
		},
	};
}

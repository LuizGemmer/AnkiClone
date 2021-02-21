import React from "react";

import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import AddButton from "../Components/AddButton";

import useForm from "../useForm.js";
import useIpc from "../useIpc.js";
import { channels } from "../Channels";

export default function AddNewDeck() {
	const { ipcConstructor, ipcSend } = useIpc(false);

	const state = () => {
		const configs = ipcConstructor(channels.GET_CONFIGS);
		return {
			select: {
				deckConfig: {
					options: configs,
					value: configs[0],
				},
			},
			text: {
				deckName: "",
			},
		};
	};

	const addNewDeck = () => {
		const deckObject = {
			name: values.text.deckName,
			deckConfig: values.select.deckConfig.value,
		};
		ipcSend(channels.ADD_NEW_DECK, deckObject);
	};

	const { values, errors, handleChange, handleSubmit } = useForm(
		state(),
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

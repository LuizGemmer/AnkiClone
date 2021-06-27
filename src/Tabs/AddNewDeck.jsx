import React from "react";

import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import AddButton from "../Components/AddButton";

import useForm from "../useForm.js";
import useIpc from "../useIpc.js";
import { channels } from "../shared/Channels";

export default function AddNewDeck(props) {
	const { ipcConstructor, ipcSend } = useIpc(false);

	const state = () => {
		const configs = ipcConstructor(channels.GET_CONFIGS);
		console.log(props.editDeck);
		return {
			select: {
				deckConfig: {
					options: configs,
					value: props.editMode
						? props.editDeck.configuration.name
						: configs[0],
				},
			},
			text: {
				deckName: props.editMode ? props.editDeck.name : "",
			},
		};
	};

	const addNewDeck = () => {
		const deckObject = {
			name: values.text.deckName,
			configuration: values.select.deckConfig.value,
		};

		if (props.editMode) {
			ipcSend(channels.EDIT_DECK, deckObject, props.editDeck.name);
			props.returnTab();
		} else {
			ipcSend(channels.ADD_NEW_DECK, deckObject);
		}
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
			<AddButton
				label={props.editMode ? "Save" : "Add Deck"}
				onClick={handleSubmit}
			/>
		</React.Fragment>
	);
}

import React from "react";
import TextInput from "../Components/TextInput";
import CheckboxInput from "../Components/Checkbox";
import AddButton from "../Components/AddButton";

import { Divider } from "@material-ui/core";

import useForm from "../useForm";
import useIpc from "../useIpc";
import { channels } from "../Channels";

const form = {
	text: {
		configName: "",
		dueCardsMaxPerReview: 1000,
		newCardsMaxPerReview: 1000,
		retirementAgeInDays: 120,
	},
	checkbox: {
		useRetirement: true,
		showReaminingCardsInReview: true,
		showTimerInReview: true,
	},
};

export default function DeckConfigurationForm(props) {
	const { ipcSend } = useIpc();

	const submit = () => {
		const deckConfig = { ...values };
		ipcSend(channels.ADD_DECK_CONFIG, deckConfig);
	};

	const { values, errors, handleChange, handleSubmit } = useForm(form, submit);

	return (
		<div>
			<div>
				<TextInput
					name="configName"
					label="Name"
					onChange={handleChange}
					error={errors.configName}
					value={values.text.configName}
				/>
			</div>
			<Divider />
			<div style={styles.section}>
				<TextInput
					name="dueCardsMaxPerReview"
					label="Maximum review per session"
					onChange={handleChange}
					error={errors.dueCardsMaxPerReview}
					value={values.text.dueCardsMaxPerReview}
					type="number"
				/>
				<TextInput
					name="newCardsMaxPerReview"
					label="Maximum new cards per session"
					onChange={handleChange}
					error={errors.newCardsMaxPerReview}
					value={values.text.newCardsMaxPerReview}
					type="number"
				/>
				<CheckboxInput
					label="Enable Retirement"
					name="useRetirement"
					checked={values.checkbox.useRetirement}
					onChange={handleChange}
				/>
				{values.checkbox.useRetirement ? (
					<TextInput
						name="retirementAgeInDays"
						label="Retirement time (in days)"
						onChange={handleChange}
						error={errors.retirementAgeInDays}
						value={values.text.retirementAgeInDays}
						type="number"
					/>
				) : null}
			</div>
			<Divider />
			<div style={styles.section}>
				<CheckboxInput
					label="Show cards remaining to review"
					name="showReaminingCardsInReview"
					checked={values.checkbox.showReaminingCardsInReview}
					onChange={handleChange}
				/>
				<CheckboxInput
					label="Show timer in review"
					name="showTimerInReview"
					checked={values.checkbox.showTimerInReview}
					onChange={handleChange}
				/>
			</div>
			<AddButton label="Add Config" onClick={handleSubmit} />
		</div>
	);
}

const styles = {
	section: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridGap: "15px",

		margin: "10px 0",
	},
};

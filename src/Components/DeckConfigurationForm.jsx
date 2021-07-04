import React from "react";
import TextInput from "../Components/TextInput";
import CheckboxInput from "../Components/Checkbox";
import AddButton from "../Components/AddButton";

import { Divider } from "@material-ui/core";

import useForm from "../useForm";
import useIpc from "../useIpc";
import { channels } from "../shared/Channels";

export default function DeckConfigurationForm(props) {
	const { ipcSend } = useIpc();

	const form = getInitialState(props.editMode, props.editConfig);

	const submit = () => {
		const {
			configName,
			dueCardsMaxPerReview,
			newCardsMaxPerReview,
			retirementAgeInDays,
		} = values.text;
		const deckConfig = {
			...values.checkbox,
			name: configName,
			maxDueCardsDay: dueCardsMaxPerReview,
			maxNewCardsDay: newCardsMaxPerReview,
			retirementAgeInDays,
		};

		if (props.editMode) {
			ipcSend(channels.EDIT_DECK_CONFIG, deckConfig);
			props.returnTab();
		} else {
			ipcSend(channels.ADD_DECK_CONFIG, deckConfig);
		}
	};

	const { values, errors, handleChange, handleSubmit } = useForm(
		form,
		submit
	);

	return (
		<div
			style={props.editMode ? { height: "calc(100% + 50px)" } : undefined}
		>
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

const getInitialState = (editMode, editConfig) => {
	return {
		text: {
			configName: editMode ? editConfig.name : "",
			dueCardsMaxPerReview: editMode ? editConfig.maxDueCardsDay : 1000,
			newCardsMaxPerReview: editMode ? editConfig.maxNewCardsDay : 1000,
			retirementAgeInDays: editMode
				? editConfig.retirementAgeInDays
				: 120,
		},
		checkbox: {
			useRetirement: editMode ? editConfig.useRetirement : true,
			showReaminingCardsInReview: editMode
				? editConfig.showReaminingCardsInReview
				: true,
			showTimerInReview: editMode ? editConfig.showTimerInReview : true,
		},
	};
};

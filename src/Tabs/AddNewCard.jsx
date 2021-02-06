import React, { Component } from "react";

import { withTheme } from "@material-ui/core";
import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import AddButton from "../Components/AddButton";

import { channels } from "../Channels";
const { ipcRenderer } = window.require("electron");

class AddNewCard extends Component {
	render() {
		return (
			<div style={this.styles.container}>
				<div style={this.styles.selectField}>
					<SelectInput
						label="Deck"
						options={this.state.decks}
						selected={this.state.form.selected}
						onSelectChange={this.handleSelectChange}
					/>
				</div>
				<div>
					{this.state.form.textFields.map((field) => (
						<TextInput
							field={field}
							key={field.name}
							onChange={this.handleInputChange}
						/>
					))}
				</div>
				<AddButton onClick={this.handleAddCard} label="Add Card" />
			</div>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			decks: getDecks(),
			form: {
				textFields: [
					{ name: "Front", value: "" },
					{ name: "Back", value: "" },
				],
			},
		};
		// Set initial selected value to the first deck in the decks array
		if (!this.state.form["selected"]) {
			this.state.form["selected"] = this.state.decks[0];
		}

		function getDecks() {
			return ipcRenderer.sendSync(channels.GET_DECKS);
		}
	}

	handleSelectChange = (event) => {
		let newState = this.state.form;
		newState.selected = event.target.value;
		this.setState(newState);
	};

	handleInputChange = (event, fieldName) => {
		const newState = this.state.form;
		newState.textFields.forEach((field) => {
			if (field.name === fieldName) {
				field.value = event.target.value;
			}
		});
		this.setState(newState);
	};

	// Creates a card object and sends it to the main process (not really :d)
	handleAddCard = () => {
		const cardObject = {
			deck: this.state.form.selected,
			type: "Basic Card", // Feature to be implemented
			fields: this.state.form.textFields,
		};

		ipcRenderer.send(channels.ADD_NEW_CARD, cardObject);
		this.resetFieldsValues();
	};

	resetFieldsValues() {
		const newState = this.state.form;
		newState.textFields.forEach((field) => (field.value = ""));
		this.setState({ newState });
	}

	styles = {
		selectField: {
			width: "100%",
			display: "flex",
			justifyContent: "space-around",
			marginBottom: "16px",
		},
	};
}

export default withTheme(AddNewCard);

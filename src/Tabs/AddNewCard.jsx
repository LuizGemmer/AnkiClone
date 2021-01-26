import React, { Component } from "react";

import { withTheme } from "@material-ui/core";
import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import AddButton from "../Components/AddButton";

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
							liftUpInput={this.updateTextFieldValue}
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
			decks: ["Dummy deck 1", "Dummy deck 2", "Dummy deck 3"],
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
	}

	handleSelectChange = (event) => {
		let newState = this.state.form;
		newState.selected = event.target.value;
		this.setState(newState);
	};

	// Creates a new deck object based on the user's input
	// and sends it to the main process (not really :D )
	updateTextFieldValue = (value, fieldName) => {
		const newState = this.state.form.textFields;
		newState.forEach((input) => {
			if (input.name === fieldName) {
				input.value = value;
			}
		});
		this.setState(newState);
	};

	// Creates a cardObject and sends it to the main process (not really :d)
	handleAddCard = () => {
		const cardObject = {
			deck: this.state.form.selected,
			type: "Basic Card", // Feature to be implemented
			fields: this.state.form.textFields,
		};
		console.log(cardObject);
	};

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

import React, { Component } from "react";

import { withTheme, Button } from "@material-ui/core";
import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";

class AddNewCard extends Component {
	render() {
		return (
			<div style={this.styles.container}>
				<div style={this.styles.selectField}>
					<SelectInput
						label="Deck"
						options={this.state.decks}
						selected={this.state.form.deck}
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
				<Button
					variant="contained"
					onClick={this.handleAddCard}
					color="primary"
				>
					Add Card
				</Button>
			</div>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			decks: [
				{ id: 1, name: "Dummy deck 1" },
				{ id: 2, name: "Dummy deck 2" },
				{ id: 3, name: "Dummy deck 3" },
			],
			form: {
				deck: 0,
				textFields: [
					{ name: "Front", value: "" },
					{ name: "Back", value: "" },
				],
			},
		};
	}

	handleSelectChange = (event) => {
		let newState = this.state.form;
		newState.select = event.target.value;
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
		// In case the user did not selected an option in the select input,
		// puts the card in the first deck
		const deck = (this.state.form.deck = 0
			? this.state.decks[0]
			: this.state.form.deck);

		const cardObject = {
			deck,
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

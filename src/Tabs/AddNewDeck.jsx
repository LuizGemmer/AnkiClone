import React, { Component } from "react";

import TextInput from "../Components/TextInput";
import SelectInput from "../Components/SelectInput";
import AddButton from "../Components/AddButton";

export default class AddNewDeck extends Component {
	render() {
		return (
			<React.Fragment>
				<TextInput
					field={this.state.form.textInput}
					liftUpInput={this.updateTextFieldValue}
				/>
				<SelectInput
					label="Deck Configuration"
					onSelectChange={this.handleSelectChange}
					Selected={this.state.form.select}
					options={this.state.deckConfigurations}
				/>
				<AddButton label="Add Deck" onClick={this.handleAddDeck} />
			</React.Fragment>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			deckConfigurations: [
				{ name: "Dummy 1", id: 1 },
				{ name: "Dummy 2", id: 2 },
			],
			form: {
				textInput: { name: "Deck Name", value: "" },
				select: 0,
			},
		};
	}

	// Handle changes in the select input type in the "form"
	handleSelectChange = (event) => {
		let newState = this.state.form;
		newState.select = event.target.value;
		this.setState(newState);
	};

	// Creates a new deck object based on the user's input
	// and sends it to the main process (not really :D )
	handleAddDeck = () => {
		let formData = this.state.form;
		let deckConfigurationId =
			formData.select === 0
				? this.state.deckConfigurations[0].id
				: formData.select;

		const deckObject = {
			name: formData.textInput.value,
			deckConfigurationId,
		};
		console.log(deckObject);
	};
}

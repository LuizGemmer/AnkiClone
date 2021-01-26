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
					Selected={this.state.form.selected}
					options={this.state.deckConfigurations}
				/>
				<AddButton label="Add Deck" onClick={this.handleAddDeck} />
			</React.Fragment>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			deckConfigurations: ["Dummy 1", "Dummy 2"],
			form: {
				textInput: { name: "Deck Name", value: "" },
			},
		};
		// Set initial selected value to the first config in the deckConfig array
		if (!this.state.form["selected"]) {
			this.state.form["selected"] = this.state.deckConfigurations[0];
		}
	}

	// Handle changes in the select input type in the "form"
	handleSelectChange = (event) => {
		let newState = this.state.form;
		newState.selected = event.target.value;
		this.setState(newState);
	};

	// Creates a new deck object based on the user's input
	// and sends it to the main process (not really :D )
	handleAddDeck = () => {
		let formData = this.state.form;

		const deckObject = {
			name: formData.textInput.value,
			deckConfiguration: formData.selected,
		};
		console.log(deckObject);
	};
}

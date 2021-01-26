import React, { Component } from "react";

import { withTheme } from "@material-ui/core";

class TextInput extends Component {
	render() {
		return (
			<div style={this.styles.textBlock}>
				<span style={this.state.hasError ? this.styles.errorText : {}}>
					{this.state.hasError
						? this.state.errorMessage + "!"
						: this.props.field.name + ":"}
				</span>
				<input
					type="text"
					style={
						this.state.hasError
							? Object.assign({}, this.styles.textField, this.styles.errorField)
							: this.styles.textField
					}
					value={this.state.value}
					onChange={(event) => this.handleChange(event)}
					onBlur={this.handleOnBlur}
				/>
			</div>
		);
	}

	constructor(props) {
		super(props);
		this.state = { value: "", hasError: false, errorMessage: "" };
	}

	// Updates the state once for each character typed
	// by the user
	handleChange = (event) => {
		this.setState({ value: event.target.value });
	};

	// Once the user clicks out of the input field,
	// does a small error checking and lifts its value
	handleOnBlur = () => {
		const fieldName = this.props.field.name;
		const value = this.state.value;

		if (value === "") {
			this.setState({
				hasError: true,
				errorMessage: `${fieldName} cannot be empty`,
			});
			return;
		}

		this.props.liftUpInput(value, fieldName);
	};

	// CSS
	styles = {
		textBlock: {
			display: "flex",
			flexDirection: "column",
		},
		textField: {
			width: "100%",
			padding: "12px 12px",
			boxSizing: "border-box",
			margin: "6px 0px 12px 0px",

			background: this.props.theme.palette.background.paper,
			border: "none",
			borderBottom: `2px solid ${this.props.theme.palette.primary.light}`,

			color: this.props.theme.palette.text.secondary,
			fontSize: "16px",
		},
		errorText: {
			color: this.props.theme.palette.error.light,
		},
		errorField: {
			borderBottom: `2px solid ${this.props.theme.palette.error.light}`,
		},
	};
}

export default withTheme(TextInput);

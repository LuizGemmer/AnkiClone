import React, { Component } from "react";

import { withTheme } from "@material-ui/core";

class TextInput extends Component {
	render() {
		return (
			<div style={this.styles.textBlock}>
				<span style={this.props.error ? this.styles.errorText : {}}>
					{this.props.label}
				</span>
				<input
					name={this.props.name}
					type="text"
					style={
						this.props.error
							? Object.assign({}, this.styles.textField, this.styles.errorField)
							: this.styles.textField
					}
					value={this.props.value}
					onChange={(event) => this.props.onChange(event)}
				/>
				{this.props.error && (
					<span style={this.styles.errorMessage}>{this.props.error}</span>
				)}
			</div>
		);
	}

	// CSS
	styles = {
		textBlock: {
			display: "flex",
			flexDirection: "column",
			marginBottom: "12px",
		},
		textField: {
			width: "100%",
			padding: "12px 12px",
			boxSizing: "border-box",
			marginTop: "6px",

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
		errorMessage: {
			color: this.props.theme.palette.error.light,
			fontSize: "12px",
			marginTop: "6px",
		},
	};
}

export default withTheme(TextInput);

import React, { Component } from "react";

import { Checkbox } from "@material-ui/core";

export default class CheckboxInput extends Component {
	render() {
		return (
			<div style={this.styles.checkbox}>
				<span>{this.props.label}:</span>
				<Checkbox
					name={this.props.name}
					checked={this.props.checked}
					onChange={this.props.onChange}
					color="primary"
				/>
			</div>
		);
	}

	styles = {
		checkbox: {
			display: "flex",
			alignItems: "center",
		},
	};
}

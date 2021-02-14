import React, { Component } from "react";

import { withTheme } from "@material-ui/core";

class SelectInput extends Component {
	render() {
		return (
			<div style={this.styles.selectBlock}>
				<span>{this.props.label}:</span>
				<select
					name={this.props.name}
					style={this.styles.select}
					onChange={(event) => this.props.onChange(event)}
					value={this.props.selected}
				>
					{this.props.options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		);
	}

	styles = {
		selectBlock: {
			display: "flex",
			flexDirection: "column",
			width: "45%",
		},
		select: {
			width: "100%",
			padding: "6px 12px",
			boxSizing: "border-box",
			margin: "6px 0",

			background: this.props.theme.palette.background.paper,
			border: "none",
			borderBottom: `2px solid ${this.props.theme.palette.primary.light}`,

			color: this.props.theme.palette.text.secondary,
			fontSize: "16px",

			cursor: "pointer",
		},
	};
}

export default withTheme(SelectInput);

import React, { Component } from "react";
import { ListItem } from "@material-ui/core";

export default class CardItem extends Component {
	render() {
		return (
			<ListItem
				button
				onClick={this.props.onClick}
				style={this.styles.item}
			>
				<span>{this.props.card.id}</span>
				<span>{this.props.card.deck}</span>
				<span>{this.props.card.fields.Front.substring(0, 25)}</span>
			</ListItem>
		);
	}

	styles = {
		item: {
			display: "flex",
			justifyContent: "space-between",
		},
	};
}

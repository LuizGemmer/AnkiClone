import React, { Component } from "react";

import { withTheme } from "@material-ui/core";
import { Divider } from "@material-ui/core";

import DeckItem from "../Components/DeckItem";

class Home extends Component {
	render() {
		return (
			<div style={this.styles.container}>
				<div style={this.styles.gridItem}>
					<span>Deck</span>
					<span style={this.styles.center}>Due</span>
					<span style={this.styles.center}>New</span>
				</div>
				<Divider />
				<DeckItem styles={this.styles.gridItem} deck={this.dummyDeck} />
			</div>
		);
	}

	dummyDeck = {
		id: 1,
		name: "Dummy deck",
		due: 33,
		new: 10,
	};

	styles = {
		container: {
			height: "calc(100vh - 48px)",
			width: "100vw",
			padding: "20px 5%",
			boxSizing: "border-box",

			color: this.props.theme.palette.text.secondary,
			background: this.props.theme.palette.background.default,
		},
		gridItem: {
			display: "grid",
			width: "100%",
			gridTemplateColumns: "4fr 1fr 1fr",
			padding: "12px 10px",
			boxSizing: "border-box",

			fontSize: "16px",
			fontFamily: "-apple-system",
		},
		center: { textAlign: "center" },
	};
}

export default withTheme(Home);

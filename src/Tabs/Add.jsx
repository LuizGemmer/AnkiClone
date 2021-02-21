import React, { Component } from "react";

import { withTheme } from "@material-ui/core";

import Navbar from "../Components/Navbar";
import AddNewCard from "./AddNewCard";
import AddNewDeck from "./AddNewDeck";
import DeckConfigurationForm from "../Components/DeckConfigurationForm";

class Add extends Component {
	render() {
		// Renders the add tab's navigation bar and the selected subtab
		return (
			<React.Fragment>
				<Navbar
					tabs={this.state.tabs}
					value={this.state.tab}
					handleChange={(newValue) => this.setState({ tab: newValue })}
				/>
				<div style={this.containerStyle}>
					{this.state.tabs[this.state.tab].component}
				</div>
			</React.Fragment>
		);
	}

	constructor(props) {
		// Initializes Tabs
		super(props);
		this.state = {
			tab: 0,
			tabs: [
				{ name: "New Card", component: <AddNewCard /> },
				{ name: "New Deck", component: <AddNewDeck /> },
				{ name: "Deck Config", component: <DeckConfigurationForm /> },
			],
		};
	}

	// Styles the tab container
	containerStyle = {
		width: "100vw",
		height: "calc(100vh - 96px)", // 96 = size of the two navigation bars
		padding: "5%",
		boxSizing: "border-box",

		background: this.props.theme.palette.background.default,
		color: this.props.theme.palette.text.secondary,
	};
}

export default withTheme(Add);

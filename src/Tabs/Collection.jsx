import React, { Component } from "react";

import { withTheme, Paper } from "@material-ui/core";

import Navbar from "../Components/Navbar";

import { channels } from "../shared/Channels";
import ItemsList from "../Components/ItemsList";
const { ipcRenderer } = window.require("electron");

class Collection extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar
					value={this.state.navValue}
					tabs={this.state.tabs}
					handleChange={this.changeTab}
				/>
				<div style={this.styles().container}>
					<Paper style={this.styles().list}>
						<ItemsList
							changeTab={this.changeTab}
							collection={this.state.collection}
							value={this.state.value}
							navValue={this.state.navValue}
							returnTab={this.returnTab}
						/>
					</Paper>
				</div>
			</React.Fragment>
		);
	}

	constructor(props) {
		super(props);

		const collection = ipcRenderer.sendSync(channels.GET_COLLECTION);

		this.state = {
			collection,
			tabs: [
				{ name: "Decks", value: 0 },
				{ name: "Cards", value: 1 },
				{ name: "Deck Config", value: 2 },
			],
			value: 0,
			navValue: 0,
		};
	}

	changeTab = newTab => {
		if (newTab === 3) {
			// Edit Tab
			this.setState({ value: newTab });
		} else {
			this.setState({ value: newTab, navValue: newTab });
		}
	};

	returnTab = () => {
		this.changeTab(this.state.navValue);
	};

	styles = () => ({
		container: {
			height: "calc(100vh - 96px)",
			width: "100vw",
			padding: "20px 5%",
			boxSizing: "border-box",

			color: this.props.theme.palette.text.secondary,
			background: this.props.theme.palette.background.default,
		},
		list: {
			maxHeight: "100%",
			height: this.state.value === 3 ? "65%" : "auto",
			overflow: this.state.value === 3 ? "hidden" : "auto",
		},
	});
}

export default withTheme(Collection);

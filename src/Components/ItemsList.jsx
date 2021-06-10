import React, { Component } from "react";

import { List, ListItem, ListItemText, withTheme } from "@material-ui/core";

import Menu from "./Menu";

class ItemsList extends Component {
	render() {
		return (
			<React.Fragment>
				<List style={this.styles.list}>
					{this.getListItems().map((item, index) => (
						<ListItem key={index} button onClick={this.handleClick}>
							<ListItemText>
								{this.props.value === 0 || this.props.value === 2
									? item.name
									: `${item.id} - ${item.front.substr(0, 30)}... - ${
											item.deck
									  }`}
							</ListItemText>
						</ListItem>
					))}
				</List>
				<Menu
					theme={this.props.theme}
					anchor={this.state.anchorEl}
					handleClose={this.handleClose}
				/>
			</React.Fragment>
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			deck: undefined,
			anchorEl: null,
		};
	}

	getListItems = () => {
		let deck = this.state.deck;

		if (this.props.value === 0) {
			return this.props.collection.decks;
		} else if (this.props.value === 1) {
			return this.getListOfCards(deck);
		} else if (this.props.value === 2) {
			return this.props.collection.deckConfigs;
		}
	};

	getListOfCards = (deck = undefined) => {
		let cards = [];
		if (deck) {
			for (let deck of this.props.collection.decks) {
				if (deck.name === this.state.deck) {
					for (let card of Object.values(deck.cards)) {
						cards.push({
							id: card.id,
							front: card.fields.Front,
							deck: deck.name,
						});
					}
				}
			}
		} else {
			for (let deck of this.props.collection.decks) {
				for (let card of Object.values(deck.cards)) {
					cards.push({
						id: card.id,
						front: card.fields.Front,
						deck: deck.name,
					});
				}
			}
		}

		return cards;
	};

	handleClick = (event) => {
		this.setState({ target: event.target.innerText });
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = (event) => {
		let text = event.target.innerText;

		if (text == "See cards") {
			this.props.changeTab(1);
			this.setState({ deck: this.state.target });
		}

		this.setState({ anchorEl: null });
	};

	styles = {
		list: {
			margin: "5px 10px",
		},
	};
}

export default withTheme(ItemsList);

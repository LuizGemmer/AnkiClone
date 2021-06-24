import React, { Component } from "react";

import { List, ListItem, withTheme } from "@material-ui/core";

import Menu from "./Menu";
import CardItem from "./CardItem";

class ItemsList extends Component {
	render() {
		return (
			<React.Fragment>
				<List style={this.styles.list}>
					{this.getListItems().map((item, index) => (
						<React.Fragment>
							{this.props.value === 1 ? (
								<CardItem
									onClick={this.handleClick}
									card={item}
									key={item.id}
								/>
							) : (
								<ListItem
									button
									key={item.name}
									onClick={this.handleClick}
								>
									{item.name}
								</ListItem>
							)}
						</React.Fragment>
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
			return Object.values(this.props.collection.deckConfigs);
		}
	};

	getListOfCards = (filter = undefined) => {
		let cards = [];

		for (let deck of this.props.collection.decks) {
			if (deck.name === this.state.deck || !filter) {
				cards.push.apply(cards, Object.values(deck.cards));
			}
		}

		return cards;
	};

	handleClick = event => {
		this.setState({
			target: event.target.innerText,
			anchorEl: event.currentTarget,
		});
	};

	handleClose = event => {
		let text = event.target.innerText;

		if (text === "See cards") {
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

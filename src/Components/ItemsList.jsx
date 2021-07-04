import React, { Component } from "react";

import { List, ListItem, withTheme } from "@material-ui/core";

import Menu from "./Menu";
import CardItem from "./CardItem";
import AddNewDeck from "../Tabs/AddNewDeck";
import AddNewCard from "../Tabs/AddNewCard";
import DeckConfigurationForm from "./DeckConfigurationForm";

class ItemsList extends Component {
	render() {
		return (
			<React.Fragment>
				<List style={this.styles.list} key={this.props.value}>
					{this.getListItems().map((item, index) => (
						<React.Fragment>
							{this.props.value === 1 ? (
								<CardItem
									onClick={this.handleClick}
									card={item}
									id={item.id}
									key={item.id}
								/>
							) : this.props.value === 3 ? (
								this.openEditWindow()
							) : (
								<ListItem
									button
									key={index}
									id={item.name}
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
					value={this.props.value}
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
		} else return [1];
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

	openEditWindow = () => {
		switch (this.props.navValue) {
			case 0:
				// if a deck is being edited, takes this deck and opens a edit tab for ir
				const editDeck = this.props.collection.decks.filter(
					deck => deck.name === this.state.target
				)[0];

				return (
					<AddNewDeck
						editMode={true}
						editDeck={editDeck}
						returnTab={this.props.returnTab}
					/>
				);
			case 1:
				// Same for cards
				let card = {};
				this.props.collection.decks.forEach(deck => {
					if (deck.cards[this.state.target]) {
						card = deck.cards[this.state.target];
					}
				});

				return (
					<AddNewCard
						editMode={true}
						editCard={card}
						returnTab={this.props.returnTab}
					/>
				);
			case 2:
				let editConfig =
					this.props.collection.deckConfigs[this.state.target];

				return (
					<DeckConfigurationForm
						editMode={true}
						editConfig={editConfig}
						returnTab={this.props.returnTab}
					/>
				);
			default:
				return;
		}
	};

	handleClick = event => {
		this.setState({
			target: event.target.id,
			anchorEl: event.currentTarget,
		});
	};

	handleClose = event => {
		let text = event.target.innerText;

		switch (text) {
			case "See cards":
				// this.setState({ deck: this.state.target });
				this.props.changeTab(1);
				break;
			case "Edit":
				this.props.changeTab(3);
				break;
			default:
				return;
		}

		this.setState({ anchorEl: null });
	};

	styles = {
		list: {
			margin: "5px 10px",
			height: "100%",
			boxSizing: "border-box",
		},
	};
}

export default withTheme(ItemsList);

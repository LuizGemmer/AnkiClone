import React, { Component } from "react";

import { withTheme } from "@material-ui/core";

import AnsewerBar from "../Components/AnsewerBar";
import ReviewSection from "../Components/ReviewSection";
import EndReviewMessage from "../Components/EndReviewMessage";

import { channels } from "../Channels.js";
const { ipcRenderer } = window.require("electron");

class Review extends Component {
	render() {
		const reviewEnded = this.state.cards.length === 0;

		return (
			<div style={this.styles.container}>
				{reviewEnded ? (
					<EndReviewMessage />
				) : (
					<React.Fragment>
						<ReviewSection
							card={this.state.cards[0]}
							showAnswer={this.state.showAnswer}
						/>
						<AnsewerBar
							onShowAnswers={() => this.setState({ showAnswer: true })}
							onReview={this.reviewCard}
							showAnswer={this.state.showAnswer}
						/>
					</React.Fragment>
				)}
			</div>
		);
	}

	constructor(props) {
		super(props);
		this.state = { cards: [], showAnswer: false, reviewedCards: [], index: 0 };

		// Initializes the state
		if (!this.state.cards[0]) {
			this.state.cards = ipcRenderer.sendSync(
				channels.GET_DUE_CARDS,
				this.props.deck
			);
		}
	}

	reviewCard = (ease) => {
		const cards = [...this.state.cards];
		const card = cards[0];
		card.ease = ease;

		if (ease === 0) {
			cards.push(card);
		}

		// Remove the card from the begging of the list and update state
		cards.splice(0, 1);
		this.setState({ cards, showAnswer: false });
		this.saveReview(card);
	};

	saveReview = (card) => {
		ipcRenderer.send(channels.SAVE_REVIEW, card);
	};

	styles = {
		// Will be defined by the card type
		container: {
			height: "calc(100vh - 48px)",
			width: "100vw",
			padding: "20px 5%",
			boxSizing: "border-box",

			display: "flex",
			flexDirection: "column",

			color: this.props.theme.palette.text.secondary,
			background: this.props.theme.palette.background.default,
		},
	};
}

export default withTheme(Review);

const fs = require("fs");

class Deck {
	constructor(cardList, deckProperties) {
		this.cards = cardList;
		this.name = deckProperties.name;
		this.newCardsCount = this.getNewCardsCount();
		this.dueCardsCount = this.getDueCardsCount();
	}

	getNewCardsCount() {
		let count = 0;
		for (let card of this.cards) {
			if (card.isNew()) count++;
			else break; // the list of cards is sorted so that the new ones are the first ones.
		}
		return count;
	}

	getDueCardsCount() {
		return this.cards.length - this.newCardsCount;
	}

	getReviewCards() {
		const reviewCards = [];

		// Removes the cards from the this.cards property and
		// add them to the review cards, if the card should be reviewed.
		for (let index in this.cards) {
			if (this.cards[index].shouldBeReviewed()) {
				const card = this.cards.splice(index, 1);
				reviewCards.push(card);
			}
		}
		return reviewCards;
	}

	// not tested
	finishReviewSession(reviewCards) {
		// Take the reviewed cards and add them back to the deck
		this.cards.push.apply(reviewCards);
	}

	// not tested
	addNewCard(newCard) {
		this.cards.unshift(newCard);
	}

	getSaveInfo() {
		let content = { name: this.name, cards: [] };
		for (let card of this.cards) {
			content.cards.push(card.getSaveInfo());
		}

		const saveInfo = { path: `/${this.name}`, content };
		return JSON.stringify(saveInfo);
	}
}

module.exports = { Deck };

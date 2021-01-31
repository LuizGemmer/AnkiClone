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

	// not tested
	getReviewCards() {
		// Get all the cards the user is supossed to review
		const reviewCards = [];
		for (let i = 0; i < this.cards.length; i++) {
			let card = this.cards[i];

			if (card.shouldBeReviewed()) {
				reviewCards.push(card);
				this.cards.splice(i); // Will make it easier to add the reviewed cards back.
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

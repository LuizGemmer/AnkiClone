const { Card } = require("./Card");

class Deck {
	constructor(cardList, deckProperties) {
		this.cards = this.getCardTree(cardList);
		this.name = deckProperties.name;
		this.newCardsCount = this.card !== [] ? this.getNewCardsCount() : 0;
		this.dueCardsCount = this.card !== [] ? this.getDueCardsCount() : 0;
	}

	getCardTree(cardList) {
		const cards = {};
		for (let card of cardList) {
			cards[card.id] = card;
		}
		return cards;
	}

	Cards() {
		return Object.values(this.cards);
	}

	getNewCardsCount() {
		let count = 0;
		for (let card of this.Cards()) {
			if (card.isNew()) count++;
		}
		return count;
	}

	getDueCardsCount() {
		let count = 0;
		for (let card of this.Cards()) {
			if (card.isDue()) count++;
		}
		return count - this.newCardsCount;
	}

	getReviewCards() {
		const reviewCards = [];

		for (let card of this.Cards()) {
			if (card.shouldBeReviewed()) {
				reviewCards.push(card);
			}
		}
		return reviewCards;
	}

	// not tested
	saveReview(cardObject) {
		const card = new Card(cardObject);

		if (card.isNew()) {
			this.newCardsCount--;
			if (card.ease === 0) this.dueCardsCount++;
		} else this.dueCardsCount--;

		card.doReview();
		this.cards[card.id] = card;
	}

	addNewCard(cardObject) {
		const card = new Card(cardObject);
		this.cards[card.id] = card;
		this.newCardsCount++;
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

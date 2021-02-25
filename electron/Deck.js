const { Card } = require("./Card");

class Deck {
	constructor(cardList, deckProperties, configuration) {
		this.cards = this.initCardsObject(cardList);
		this.name = deckProperties.name;
		this.newCardsCount = this.card !== [] ? this.updateNewCardsCount() : 0;
		this.dueCardsCount = this.card !== [] ? this.updateDueCardsCount() : 0;

		this.configuration = configuration;
		this.reviewsLeft = this.initReviewsLeft(deckProperties);
	}

	initCardsObject(cardList) {
		const cards = {};
		for (let card of cardList) {
			cards[card.id] = card;
		}
		return cards;
	}

	updateNewCardsCount() {
		let count = 0;
		for (let card of this.Cards()) {
			if (card.isNew()) count++;
		}
		return count;
	}

	updateDueCardsCount() {
		let count = 0;
		for (let card of this.Cards()) {
			if (card.isDue()) count++;
		}
		return count - this.newCardsCount;
	}

	initReviewsLeft(deck) {
		const { maxNewCardsDay, maxDueCardsDay } = this.configuration;
		const lastReviewDate = new Date(deck.lastReview.date);

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (lastReviewDate.getTime() === today.getTime()) {
			return deck.lastReview;
		} else {
			return {
				date: today,
				due: maxDueCardsDay,
				new: maxNewCardsDay,
			};
		}
	}

	Cards() {
		return Object.values(this.cards);
	}

	getHomeTabComponents() {
		return {
			name: this.name,
			due: Math.min(this.reviewsLeft.due, this.dueCardsCount),
			new: Math.min(this.reviewsLeft.new, this.newCardsCount),
		};
	}

	getReviewCards() {
		let newCardsCount = 0;
		let dueCardsCount = 0;
		const reviewCards = [];

		for (let card of this.Cards()) {
			if (card.isNew()) {
				if (newCardsCount < this.reviewsLeft.new) {
					newCardsCount++;
					reviewCards.push(card);
				}
			} else if (card.isDue()) {
				if (dueCardsCount < this.reviewsLeft.due) {
					dueCardsCount++;
					reviewCards.push(card);
				}
			}
		}
		return reviewCards;
	}

	saveReview(cardObject) {
		const card = new Card(cardObject);

		if (card.isNew()) {
			this.newCardsCount--;
			this.reviewsLeft.new--;

			if (card.ease === 0) this.dueCardsCount++;
		} else {
			this.dueCardsCount--;
			this.reviewsLeft.due--;
		}

		card.doReview();
		this.cards[card.id] = card;
	}

	addNewCard(cardObject) {
		const card = new Card(cardObject);
		this.cards[card.id] = card;
		this.newCardsCount++;
	}

	getSaveInfo() {
		const { date, due, newCards } = this.lastReview;
		let content = {
			name: "Default Deck",
			cards: [],
			configuration: "Default",
			lastReview: { date, due, new: newCards },
		};

		for (let card of this.cards) {
			content.cards.push(card.getSaveInfo());
		}

		const saveInfo = { path: `/${this.name}`, item: "deck", content };
		return JSON.stringify(saveInfo);
	}
}

module.exports = { Deck };

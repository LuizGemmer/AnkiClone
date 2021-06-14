const { Card } = require("./Card");

class Deck {
	constructor(deckProperties, configuration) {
		this.cards = {};
		this.name = deckProperties.name;

		this.configuration = configuration;
		this.reviewsLeft = this.initReviewsLeft(deckProperties);

		if (this.configuration.useRetirement) {
			this.runRetirement();
		}

		this.newCardsCount = this.card !== [] ? this.updateNewCardsCount() : 0;
		this.dueCardsCount = this.card !== [] ? this.updateDueCardsCount() : 0;
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
		return count;
	}

	initReviewsLeft(deck) {
		const { maxNewCardsDay, maxDueCardsDay } = this.configuration;

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const defaultLastReview = {
			date: today,
			due: maxDueCardsDay,
			new: maxNewCardsDay,
		};

		let lastReviewDate;
		if (deck.lastReview) {
			lastReviewDate = new Date(deck.lastReview.date);
		} else {
			return defaultLastReview;
		}

		if (lastReviewDate.getTime() === today.getTime()) {
			return deck.lastReview;
		} else {
			return defaultLastReview;
		}
	}

	runRetirement() {
		const MILISECONDS_IN_DAY = 86400000;
		const retirementAge =
			MILISECONDS_IN_DAY * this.configuration.retirementAgeInDays;

		for (let card of this.Cards()) {
			if (!["due", "reviewed"].includes(card.state)) continue;

			const reviewInterval =
				card.nextReview.getTime() - card.lastReview.getTime();
			if (reviewInterval > retirementAge) card.state = "retired";
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
			} else if (card.state === "due") {
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
			if (card.ease !== 0) {
				this.dueCardsCount--;
				this.reviewsLeft.due--;
			}
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
		let content = {
			name: this.name,
			cards: [],
			configuration: this.configuration.name,
			lastReview: this.reviewsLeft,
		};

		for (let card of this.Cards()) {
			content.cards.push(card.getSaveInfo());
		}

		const saveInfo = { path: `/${this.name}`, content };
		return saveInfo;
	}
}

module.exports = { Deck };

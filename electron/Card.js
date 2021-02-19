class Card {
	constructor(cardObject) {
		this.id = cardObject.id;
		this.type = cardObject.type;
		this.deck = cardObject.deck; // I think this won't be nedded, but I'll leave it there for now
		this.fields = cardObject.fields;
		this.lastReview = cardObject.lastReview
			? new Date(cardObject.lastReview)
			: undefined;

		// If a card does not have a review scheduled, then it is a new card
		this.nextReview = cardObject.nextReview
			? cardObject.nextReview
			: new Date();

		this.ease = cardObject.ease;
	}

	shouldBeReviewed() {
		return this.isNew() || this.isDue();
	}

	isNew() {
		return this.lastReview ? false : true;
	}

	isDue() {
		const today = new Date();
		const hasEase = this.ease !== undefined;
		return this.nextReview.getTime() - today.getTime() <= 0 || hasEase;
	}

	// not tested
	doReview() {
		// Review ease = 0: user did not remember the cards content
		if (this.ease === 0) return;

		if (this.isNew()) {
			const today = new Date();
			const MILISECONDS_IN_DAY = 86400000;

			// Sets next review interval to 1 or 4 days
			if (this.ease === 1) {
				this.nextReview = new Date(today.getTime() + MILISECONDS_IN_DAY);
			} else
				this.nextReview = new Date(today.getTime() + MILISECONDS_IN_DAY * 4);
		} else {
			// Sets next review interval based on an arbitrary formula
			const newReviewInterval = this.getNewReviewInterval();
			this.nextReview = new Date(this.lastReview.getTime() + newReviewInterval);
		}

		this.lastReview = new Date();
	}

	// not tested
	getNewReviewInterval() {
		const today = new Date();
		const lastReviewInterval = today.getTime() - this.lastReview.getTime();

		const newReviewInterval = lastReviewInterval * (this.ease / 2 + 0.5); // just an arbitrary formula
		return newReviewInterval;
	}

	getSaveInfo() {
		const saveInfo = {
			id: this.id,
			type: this.type,
			deck: this.deck, // I think this won't be nedded, but I'll leave it there for now
			fields: this.fields,
			nextReview: this.nextReview.toLocaleDateString("en-US"),
			lastReview: this.lastReview
				? this.lastReview.toLocaleDateString("en-US")
				: undefined,
		};
		return JSON.stringify(saveInfo);
	}
}

module.exports = { Card };

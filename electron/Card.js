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
	}

	shouldBeReviewed() {
		return this.isNew() || this.isDue();
	}

	isNew() {
		return this.lastReview ? false : true;
	}

	isDue() {
		const today = new Date();
		return this.nextReview.getTime() - today.getTime() <= 0;
	}

	// not tested
	doReview(reviewEase) {
		// Review ease = 0: user did not remember the cards content
		if (reviewEase === 0) return;
		const newReviewInterval = this.getNewReviewInterval();
		this.nextReview = new Date(this.lastReview.getTime() + newReviewInterval);
		this.lastReview = new Date();
	}

	// not tested
	getNewReviewInterval() {
		const today = new Date();
		const lastReviewInterval = today.getTime() - this.lastReview.getTime();
		const newReviewInterval = lastReviewInterval * (reviewEase / 2 + 0.5); // just an arbitrary formula
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

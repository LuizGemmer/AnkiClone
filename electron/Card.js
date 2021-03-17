class Card {
	constructor(cardObject) {
		this.id = cardObject.id;
		this.type = cardObject.type;
		this.fields = cardObject.fields;
		this.state = cardObject.state;

		this.lastReview = cardObject.lastReview
			? new Date(cardObject.lastReview)
			: undefined;
		// If a card does not have a review scheduled, then it is a new card
		this.nextReview = cardObject.nextReview
			? new Date(cardObject.nextReview)
			: new Date();

		this.ease = cardObject.ease;

		if (this.isDue()) this.state = "due";
	}

	isNew() {
		return this.state === "new" ? true : false;
	}

	isDue() {
		if (this.state === "due") return true;
		if (this.state !== "reviewed") return false;

		const today = new Date();
		return this.nextReview.getTime() - today.getTime() <= 0;
	}

	// not tested
	doReview() {
		// Review ease = 0: user did not remember the cards content
		if (this.ease === 0) return;
		const today = new Date();

		if (this.isNew()) {
			const MILISECONDS_IN_DAY = 86400000;

			// Sets next review interval to 1 or 4 days
			if (this.ease === 1) {
				this.nextReview = new Date(today.getTime() + MILISECONDS_IN_DAY);
			} else
				this.nextReview = new Date(today.getTime() + MILISECONDS_IN_DAY * 4);
		} else {
			// Sets next review interval based on an arbitrary formula
			const newReviewInterval = this.getNewReviewInterval();
			this.nextReview = new Date(
				this.lastReview.getTime() + newReviewInterval * 2
			);
		}

		this.state = "reviewed";
		this.lastReview = today;
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
			state: this.state,
			fields: this.fields,
			nextReview: this.nextReview,
			lastReview: this.lastReview ? this.lastReview : undefined,
		};

		// Hours and minutes do not matter, so I choose to set it to 00:00:00 by default
		if (saveInfo.lastReview) {
			saveInfo.lastReview.setHours(0, 0, 0, 0);
			saveInfo.nextReview.setHours(0, 0, 0, 0);
		}

		return saveInfo;
	}
}

module.exports = { Card };

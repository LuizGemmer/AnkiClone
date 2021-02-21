// For now, just a generator of garbege data
// for development porpuses

let deck = { name: "Default Deck", cards: [] };

for (let i = 0; i < 100; i++) {
	const card = {
		id: i,
		deck: "Default Deck",
		type: "Basic", // not implemented yet
		fields: {
			front: `garbage data front ${i}`,
			back: `garbage data back ${i}`,
		},
	};
	deck.cards.unshift(card);
}

let deckConfig = {
	name: "Default",
	dueCardsMaxPerReview: 1000,
	newCardsMaxPerReview: 1000,
	retirementAgeInDays: 120,
	useRetirement: true,
	showReaminingCardsInReview: true,
	showTimerInReview: true,
};

cardType = {
	name: "Basic",
	fields: [
		{ name: "front", placement: "front" },
		{ name: "back", placement: "back" },
	],
};

module.exports = {
	defaultCollection: { deck, deckConfig, cardType },
};

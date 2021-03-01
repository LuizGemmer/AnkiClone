// For now, just a generator of garbege data
// for development porpuses

let deck = {
	name: "Default Deck",
	cards: [],
	configuration: "Default",
	lastReview: { date: 0 },
};

let deckConfig = {
	name: "Default",
	maxDueCardsDay: 1000,
	maxNewCardsDay: 1000,
	retirementAgeInDays: 120,
	useRetirement: true,
	showReaminingCardsInReview: true,
	showTimerInReview: true,
};
let today = new Date();

for (let i = 0; i < 100; i++) {
	let lastReview = today.getTime() - 86400000 * (200 - i);
	const card = {
		id: i,
		deck: "Default Deck",
		state: "due",
		type: "Basic", // not implemented yet
		fields: {
			Front: `garbage data front ${i}`,
			Back: `garbage data back ${i}`,
		},
		lastReview,
		nextReview: new Date(),
	};
	deck.cards.unshift(card);
}

cardType = {
	name: "Basic",
	fields: [
		{ name: "Front", isInFront: true },
		{ name: "Back", isInFront: false },
	],
};

module.exports = {
	defaultCollection: { deck, deckConfig, cardType },
};

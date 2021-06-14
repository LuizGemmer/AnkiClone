// For now, just a generator of garbege data
// for development porpuses

let deck = {
	name: "Default Deck",
	cards: {},
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

const cards = [];

for (let i = 0; i < 100; i++) {
	let lastReview = today.getTime() - 86400000 * (200 - i);
	const card = {
		id: i,
		deck: "Default Deck",
		state: "due",
		fields: {
			Front: `garbage data front ${i}`,
			Back: `garbage data back ${i}`,
		},
		lastReview,
		nextReview: today,
	};

	cards.push(card);
}

module.exports = {
	defaultCollection: { cards, deck, deckConfig },
};

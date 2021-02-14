// For now, just a generator of garbege data
// for development porpuses

let DefaultDeck = { name: "Default Deck", cards: [] };

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
	DefaultDeck.cards.unshift(card);
}

module.exports = { DefaultDeck };

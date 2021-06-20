const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const Deck = require("./Deck").Deck;
const Card = require("./Card").Card;

// For now, just a test collection to garantee everything is working
const { defaultCollection } = require("./DefaultCollection");

class Collection {
	PATHS = {
		USER_DATA: app.getPath("userData"),
		USER_DECKS: path.join(app.getPath("userData"), "/decks"),
		USER_CARDS: path.join(app.getPath("userData"), "/cards"),
		DECK_CONFIGS: path.join(app.getPath("userData"), "deckConfigs"),
	};
	shouldInitializeDirs = !fs.existsSync(this.PATHS.USER_CARDS);

	constructor() {
		if (this.shouldInitializeDirs) {
			this.initializeDirs();
		}
		this.deckConfigs = this.getConfigs();
		this.cards = this.initializeCards();
		this.decks = this.initializeDecks();
		this.cardId = this.getCardId();
	}

	initializeDirs() {
		for (let path in this.PATHS) {
			if (!fs.existsSync(this.PATHS[path])) {
				fs.mkdirSync(this.PATHS[path]);
			}
		}
		fs.writeFileSync(
			path.join(this.PATHS.USER_DECKS, "/Default Deck.json"),
			JSON.stringify(defaultCollection.deck)
		);
		fs.writeFileSync(
			path.join(this.PATHS.DECK_CONFIGS, "Default.json"),
			JSON.stringify(defaultCollection.deckConfig)
		);
		fs.writeFileSync(
			path.join(this.PATHS.USER_CARDS, "cards.json"),
			JSON.stringify(defaultCollection.cards)
		);
	}

	initializeDecks() {
		let collection = [];
		const decks = this.getDecks();

		collection = decks.map(
			(deck) => new Deck(deck, this.deckConfigs[deck.configuration],  this.cards[deck.name])
		);

		return collection;
	}

	getDecks() {
		let collection = [];
		for (let file of fs.readdirSync(this.PATHS.USER_DECKS)) {
			let filePath = path.join(this.PATHS.USER_DECKS, file);
			let deck = fs.readFileSync(filePath);
			collection.push(JSON.parse(deck));
		}
		return collection;
	}

	initializeCards() {
		let cards = fs.readFileSync(path.join(this.PATHS.USER_CARDS, "cards.json"));
		cards = JSON.parse(cards);
		const cardsSortedByDeck = {}

		for (let card of cards) {
			card = new Card(card)
			
			if (!cardsSortedByDeck[card.deck]) {
				cardsSortedByDeck[card.deck] = {}
			}

			cardsSortedByDeck[card.deck][card.id] = card

		}

		return cardsSortedByDeck
	}

	getConfigs() {
		let configs = {};
		for (let fileName of fs.readdirSync(this.PATHS.DECK_CONFIGS)) {
			let file = fs.readFileSync(path.join(this.PATHS.DECK_CONFIGS, fileName));
			file = JSON.parse(file);
			configs[file.name] = file;
		}
		return configs;
	}

	getCardId() {
		// temporary, I guess...
		let id = 0;
		for (let deck of this.decks) {
			for (let card of deck.Cards()) {
				id = Math.max(id, card.id);
			}
		}
		return id;
	}

	getDeckByName(name) {
		for (let deck of this.decks) {
			if (deck.name === name) return deck;
		}
	}

	addNewDeck(deckObject) {
		const deck = new Deck(
			[],
			deckObject,
			this.deckConfigs[deckObject.configuration]
		);
		this.decks.push(deck);
		this.saveDeck(deck.name);
	}

	save() {
		for (let deck of this.decks) {
			this.saveDeck(deck.name);
		}
		this.saveDeckConfigs();
	}

	saveDeck(name) {
		// This will allow the program to save decks individualy
		// instead of saving the entire collection
		// Decks will be altered much more often than everything else,
		// so I think is a nice performance upgrade (not that it will actually matter)

		const deck = this.getDeckByName(name);
		let saveInfo = deck.getSaveInfo();

		fs.writeFileSync(
			path.join(this.PATHS.USER_DECKS, `${saveInfo.path}.json`),
			JSON.stringify(saveInfo.content)
		);
	}

	saveDeckConfigs() {
		for (let configKey in this.deckConfigs) {
			let config = this.deckConfigs[configKey];
			fs.writeFileSync(
				path.join(this.PATHS.DECK_CONFIGS, `${config.name}.json`),
				JSON.stringify(config)
			);
		}
	}
}

module.exports = { Collection };

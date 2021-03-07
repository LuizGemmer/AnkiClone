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
		DECK_CONFIGS: path.join(app.getPath("userData"), "deckConfigs"),
	};
	shouldInitializeDirs = !fs.existsSync(this.PATHS.USER_DECKS);

	constructor() {
		if (this.shouldInitializeDirs) {
			this.initializeDirs();
		}
		this.deckConfigs = this.getConfigs();
		this.decks = this.initializeDecks();
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
	}

	initializeDecks() {
		const collection = [];
		const decks = this.getDecks();
		for (let deck of decks) {
			let cards = this.initializeCards(deck.cards);
			collection.push(
				new Deck(cards, deck, this.deckConfigs[deck.configuration])
			);
		}

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

	initializeCards(cardList) {
		let cards = [];
		for (let card of cardList) {
			cards.push(new Card(card));
		}
		return cards;
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
			path.join(this.PATHS.USER_DECKS, saveInfo.path),
			saveInfo.content
		);
	}

	saveDeckConfigs() {
		for (let config of this.deckConfigs) {
			fs.writeFileSync(
				path.join(this.PATHS.DECK_CONFIGS, config.name),
				JSON.stringify(config)
			);
		}
	}
}

module.exports = { Collection };

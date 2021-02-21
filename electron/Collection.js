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
		this.decks = this.initializeDecks();
		this.deckConfigs = this.getConfigs();
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
			collection.push(new Deck(cards, deck));
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
		for (fileName of fs.readdirSync(this.PATHS.DECK_CONFIGS)) {
			const file = fs.readFileSync(fileName);
			configs[fileName] = file;
		}
		return configs;
	}

	getDeckByNameb(name) {
		for (let deck of this.decks) {
			if (deck.name === name) return deck;
		}
	}

	addNewDeck(deckObject) {
		const deck = new Deck([], deckObject);
		this.decks.push(deck);
	}

	saveToDisk() {
		for (let deck of this.decks) {
			let saveInfo = deck.getSaveInfo();
			fs.writeFileSync(saveInfo.path, saveInfo.content);
		}
	}
}

module.exports = { Collection };

const { app } = require("electron");
const path = require("path");
const fs = require("fs");

const Deck = require("./Deck").Deck;
const Card = require("./Card").Card;

// For now, just a test deck to garantee everything is working
const defaultDeck = require("./DefaultDeck").DefaultDeck;

class Collection {
	USER_DATA_PATH = app.getPath("userData");
	USER_DECKS_PATH = path.join(this.USER_DATA_PATH, "/decks");
	shouldInitializeDirs = fs.readdirSync(this.USER_DECKS_PATH).length === 0;

	constructor() {
		if (this.shouldInitializeDirs) {
			this.initializeDirs();
		}
		this.decks = this.initializeDecks();
	}

	initializeDirs() {
		if (!fs.existsSync(this.USER_DATA_PATH)) {
			fs.mkdirSync(this.USER_DATA_PATH);
		}
		if (!fs.existsSync(this.USER_DECKS_PATH)) {
			fs.mkdirSync(this.USER_DECKS_PATH);
		}
		fs.writeFileSync(
			path.join(this.USER_DECKS_PATH, "/Default Deck.json"),
			JSON.stringify(defaultDeck)
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
		for (let file of fs.readdirSync(this.USER_DECKS_PATH)) {
			let filePath = path.join(this.USER_DECKS_PATH, file);
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

	getDeckByName(name) {
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

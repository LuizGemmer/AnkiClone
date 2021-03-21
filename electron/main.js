const { app, BrowserWindow, ipcMain } = require("electron");

const { channels } = require("../src/Channels");
const { Collection } = require("./Collection");
const { createMainWindow } = require("./Windows/MainWindow");

// Initializes the collection of the user,
// his decks, cards and card types (not yet implemented)
let collection = new Collection();

const isDev = false;
let win;

app.whenReady().then(() => {
	win = createMainWindow(isDev);
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		win = null;
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

//			 Init window events
ipcMain.on(channels.GET_DECKS_NAMES_DUE_NEW, (e) => {
	let returnValue = [];

	for (let deck of collection.decks) {
		returnValue.push(deck.getHomeTabComponents());
	}
	e.returnValue = returnValue;
});

ipcMain.on(channels.GET_DECKS, (e) => {
	const decks = collection.decks.map((deck) => deck.name);
	e.returnValue = decks;
});

ipcMain.on(channels.GET_CONFIGS, (e) => {
	const configs = [];

	for (let config in collection.deckConfigs) {
		configs.push(config);
	}

	e.returnValue = configs;
});

// 			ADD SOMETHING EVENTS
ipcMain.on(channels.ADD_NEW_CARD, (e, cardObject) => {
	collection.cardId++;
	cardObject.id = collection.cardId;

	const deck = collection.getDeckByName(cardObject.deck);
	deck.addNewCard(cardObject);
	collection.saveDeck(deck.name);
});

ipcMain.on(channels.ADD_NEW_DECK, (e, deckObject) => {
	collection.addNewDeck(deckObject);
});

ipcMain.on(channels.ADD_DECK_CONFIG, (e, deckConfig) => {
	collection.deckConfigs[deckConfig.name] = deckConfig;
	collection.save();
});

// 			REVIEW TAB EVENTS
ipcMain.on(channels.GET_DUE_CARDS, (e, deckName) => {
	const deck = collection.getDeckByName(deckName);
	e.returnValue = deck.getReviewCards();
});

ipcMain.on(channels.SAVE_REVIEW, (e, args) => {
	const deck = collection.getDeckByName(args.deck);
	deck.saveReview(args.card);
});

ipcMain.on(channels.GET_DECK_CONFIG, (e, name) => {
	const deck = collection.getDeckByName(name);
	e.returnValue = deck.configuration;
});

// 			SAVE SOMETHING TO DISK EVENTS
ipcMain.on(channels.SAVE_DECK, (e, name) => {
	collection.saveDeck(name);
});

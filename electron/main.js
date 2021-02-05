const { app, BrowserWindow, ipcMain, webContents } = require("electron");

const path = require("path");
const url = require("url");

const { channels } = require("../src/Channels");
const Collection = require("./Collection").Collection;

// Initializes the collection of the user,
// his decks, cards and card types (not yet implemented)
let collection = new Collection();

const isDev = true;

let win;

function createWindow() {
	win = new BrowserWindow({
		width: isDev ? 1100 : 600,
		height: 600,
		title: "Anki Clone",
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.webContents.openDevTools();

	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, "../index.html"),
			protocol: "file:",
			slashes: true,
		});
	win.loadURL(startUrl);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

ipcMain.on(channels.GET_DECKS_NAMES_DUE_NEW, (e) => {
	let returnValue = [];
	for (let deck of collection.decks) {
		returnValue.push({
			name: deck.name,
			due: deck.dueCardsCount,
			new: deck.newCardsCount,
		});
	}
	e.returnValue = returnValue;
});

ipcMain.on(channels.FORCE_REDIRECT, (e, deckName) => {
	const deck = collection.getDeckByName(deckName);
	const reviewCards = deck.getReviewCards();

	win.webContents.send(channels.REDIRECT, reviewCards);
});

const { app, BrowserWindow } = require("electron");

const path = require("path");
const url = require("url");

const Collection = require("./Collection").Collection;

// Initializes the collection of the user,
// his decks, cards and card types (not yet implemented)
let collection = new Collection();

const isDev = true;

function createWindow() {
	const win = new BrowserWindow({
		width: isDev ? 1100 : 600,
		height: 600,
		title: "Anki Clone",
		webPreferences: {
			nodeIntegration: true,
		},
	});

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

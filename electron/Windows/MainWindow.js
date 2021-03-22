const url = require("url");
const path = require("path");

const { BrowserWindow } = require("electron");

function createMainWindow(isDev) {
	win = new BrowserWindow({
		width: isDev ? 1100 : 600,
		height: 600,
		title: "Anki Clone",
		webPreferences: {
			nodeIntegration: true,
		},
		show: false,
		autoHideMenuBar: true,
		background: "rgb(48, 48, 48);",
		contextIsolation: true,
	});

	isDev ? win.webContents.openDevTools() : null;

	const startUrl =
		process.env.ELECTRON_START_URL ||
		path.normalize(`${__dirname}/../../index.html`);
	win.loadURL(startUrl);

	win.on("ready-to-show", () => {
		win.show();
	});

	return win;
}

module.exports = { createMainWindow };

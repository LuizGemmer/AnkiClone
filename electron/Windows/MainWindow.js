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
	});

	isDev ? win.webContents.openDevTools() : null;

	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, "../index.html"),
			protocol: "file:",
			slashes: true,
		});
	win.loadURL(startUrl);

	win.on("ready-to-show", () => {
		win.show();
	});

	return win;
}

module.exports = { createMainWindow };

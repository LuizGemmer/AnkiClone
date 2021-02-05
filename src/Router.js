import { React, useState } from "react";

import { ThemeProvider } from "@material-ui/core/styles";

import Theme from "./Theme";
import Add from "./Tabs/Add";
import Home from "./Tabs/Home";
import Review from "./Tabs/Review";
import Navbar from "./Components/Navbar";

import { channels } from "./Channels";
const { ipcRenderer } = window.require("electron");

export default function Router() {
	const [tab, setTab] = useState(0);
	const [reviewTab, setReviewTab] = useState({ show: false });
	const tabs = [
		{ name: "Home", component: <Home /> },
		{ name: "Add", component: <Add /> },
	];

	ipcRenderer.on(channels.REDIRECT, (args) => {
		setReviewTab({ show: true, reviewCards: args });
	});

	const getTab = () => {
		if (reviewTab.show) {
			return <Review cards={reviewTab.reviewCards} />;
		}
		return tabs[tab].component;
	};

	const changeTab = (newTab) => {
		if (reviewTab.show) setReviewTab({ show: false });
		setTab(newTab);
	};

	return (
		<ThemeProvider theme={Theme}>
			<Navbar
				value={tab}
				handleChange={(newValue) => changeTab(newValue)}
				tabs={tabs}
			/>
			{getTab()}
		</ThemeProvider>
	);
}

import { React, useState } from "react";

import { ThemeProvider } from "@material-ui/core/styles";

import Theme from "./Theme";
import Add from "./Tabs/Add";
import Home from "./Tabs/Home";
import Navbar from "./Components/Navbar";

export default function Router() {
	const [tab, setTab] = useState(0);
	const tabs = [
		{ name: "Home", component: <Home /> },
		{ name: "Add", component: <Add /> },
	];

	return (
		<ThemeProvider theme={Theme}>
			<Navbar
				value={tab}
				handleChange={(newValue) => setTab(newValue)}
				tabs={tabs}
			/>
			{tabs[tab].component}
		</ThemeProvider>
	);
}

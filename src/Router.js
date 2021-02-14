import { React, useState } from "react";

import { ThemeProvider } from "@material-ui/core/styles";

import Theme from "./Theme";
import Add from "./Tabs/Add";
import Home from "./Tabs/Home";
import Review from "./Tabs/Review";
import Navbar from "./Components/Navbar";

export default function Router() {
	const [tab, setTab] = useState(0);
	const [reviewTab, setReviewTab] = useState({ show: false });

	const tabs = [
		{
			name: "Home",
			component: (
				<Home openReviewTab={(deck) => setReviewTab({ show: true, deck })} />
			),
		},
		{ name: "Add", component: <Add /> },
	];

	const getTab = () => {
		if (reviewTab.show) {
			return <Review deck={reviewTab.deck} />;
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

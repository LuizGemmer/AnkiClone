import React from "react";

import { Paper, Tabs, Tab } from "@material-ui/core";

export default function Navbar(props) {
	const { value, handleChange, tabs } = props;

	return (
		<Paper square elevation={3}>
			<Tabs
				value={value}
				onChange={(event, newValue) => handleChange(newValue)}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				{tabs.map((tab) => (
					<Tab label={tab.name} key={tab.name} />
				))}
			</Tabs>
		</Paper>
	);
}

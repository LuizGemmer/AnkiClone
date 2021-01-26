import React from "react";

import { Button } from "@material-ui/core";

export default function AddButton(props) {
	const buttonStyle = {
		position: "absolute",
		bottom: "5%",
		right: "5%",
	};

	return (
		<Button
			style={buttonStyle}
			variant="contained"
			color="primary"
			onClick={props.onClick}
		>
			{props.label}
		</Button>
	);
}

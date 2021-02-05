import React from "react";

import { ButtonBase } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import { channels } from "../Channels";

const { ipcRenderer } = window.require("electron");

export default function DeckItem(props) {
	const theme = useTheme();
	const styles = createStyles(theme);

	const openReviewTab = () => {
		ipcRenderer.send(channels.FORCE_REDIRECT, props.deck.name);
	};

	return (
		<ButtonBase onClick={openReviewTab} style={props.styles}>
			<span style={styles.deckName}>{props.deck.name}</span>
			<span style={styles.due}>{props.deck.due}</span>
			<span style={styles.new}>{props.deck.new}</span>
		</ButtonBase>
	);
}

const createStyles = (theme) => {
	return {
		deckName: {
			textAlign: "left",
		},
		due: {
			color: theme.palette.success.main,
			textAlign: "center",
		},
		new: {
			color: theme.palette.primary.light,
			textAlign: "center",
		},
	};
};

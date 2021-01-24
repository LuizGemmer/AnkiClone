import React from "react";

import { ButtonBase } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export default function DeckItem(props) {
	const theme = useTheme();
	const styles = createStyles(theme);

	const openReviewTab = () => {
		console.log("still not implemented");
		console.log("deck id: ", props.deck.id);
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

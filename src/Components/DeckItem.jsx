import React from "react";

import { ButtonBase } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export default function DeckItem(props) {
	const theme = useTheme();
	const styles = createStyles(theme);

	return (
		<ButtonBase
			onClick={() => props.onClick(props.deck.name)}
			style={props.styles}
		>
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

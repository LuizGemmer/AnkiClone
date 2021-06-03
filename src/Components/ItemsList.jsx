import { List, ListItem, ListItemText, withTheme } from "@material-ui/core";
import React, { Component } from "react";

class ItemsList extends Component {
	render() {
		return (
			<List style={this.styles.list}>
				{this.getListItems().map((item) => (
					<ListItem button>
						<ListItemText>{item.name}</ListItemText>
					</ListItem>
				))}
			</List>
		);
	}

	getListItems = () => {
		if (this.props.value === 0) {
			return this.props.collection.decks;
		} else if (this.props.value === 1) {
			// return getListOfCards();
		} else if (this.props.value === 2) {
			return this.props.collection.decks;
		}
	};

	styles = {
		list: {
			margin: "5px 10px",
		},
	};
}

export default withTheme(ItemsList);

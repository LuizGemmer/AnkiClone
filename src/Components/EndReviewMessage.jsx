import React, { Component } from "react";

import { withTheme } from "@material-ui/core";

class EndReviewMessage extends Component {
	render() {
		return (
			<div style={this.styles.endReview}>
				<h1 style={this.styles.bold}>Congratulations!</h1>
				<h5 style={this.styles.text}>You reviewed all your cards for today!</h5>
				<h5 style={this.styles.text}>Come back tomorrow for more.</h5>
			</div>
		);
	}

	styles = {
		endReview: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		bold: { color: this.props.theme.palette.text.primary },
		text: { margin: "5px 0", fontSize: 16 },
	};
}

export default withTheme(EndReviewMessage);

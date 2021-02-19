import React, { Component } from "react";

import { withTheme, Button } from "@material-ui/core";

class AnsewerBar extends Component {
	render() {
		return (
			<div style={this.styles.answerbar}>
				{this.props.showAnswer ? (
					["Again", "Good", "Easy"].map((ease, index) => (
						<Button
							key={ease}
							onClick={() => this.props.onReview(index)}
							style={this.styles[ease]}
						>
							{ease}
						</Button>
					))
				) : (
					<Button onClick={this.props.onShowAnswers}>Show Answers</Button>
				)}
			</div>
		);
	}

	styles = {
		answerbar: {
			height: "60px",
			width: "100vw",
			padding: "5px 30%",
			boxSizing: "border-box",

			position: "fixed",
			bottom: "0",
			left: "0",

			background: this.props.theme.palette.background.paper,

			display: "flex",
			justifyContent: "space-around",
			alingItems: "center",
		},
		Again: { color: this.props.theme.palette.error.light },
		Good: { color: this.props.theme.palette.success.light },
		Easy: { color: this.props.theme.palette.primary.light },
	};
}

export default withTheme(AnsewerBar);

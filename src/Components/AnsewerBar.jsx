import React, { Component } from "react";

import { withTheme, Button } from "@material-ui/core";

import Timer from "./Timer";

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
				<div style={this.styles.sectionInfo}>
					<Timer />
					<span style={this.styles.Good}>{this.props.remainingCards}</span>
				</div>
			</div>
		);
	}

	styles = {
		answerbar: {
			height: "60px",
			width: "100vw",
			padding: "5px",
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
		sectionInfo: {
			position: "absolute",
			bottom: "9px",
			right: "15px",

			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
	};
}

export default withTheme(AnsewerBar);

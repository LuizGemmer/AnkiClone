import React, { Component } from "react";

import { Divider } from "@material-ui/core";

export default class ReviewSection extends Component {
	render() {
		return (
			<React.Fragment>
				<div style={this.styles.front}>
					<p>{this.props.card.fields.front}</p>
				</div>
				{this.props.showAnswer ? (
					<React.Fragment>
						<Divider />
						<div style={this.styles.back}>
							<p>{this.props.card.fields.back}</p>
						</div>
					</React.Fragment>
				) : null}
			</React.Fragment>
		);
	}

	styles = {
		// Will be defined by the card type
		front: {
			display: "flex",
			justifyContent: "center",

			margin: "0 auto",
			width: "95%",
		},
		back: {
			display: "flex",
			justifyContent: "center",

			margin: "0 auto",
			width: "95%",
		},
	};
}

import React, { Component } from "react";

export default class Timer extends Component {
	render() {
		return (
			<div>
				<span>{this.formatTime()}</span>
			</div>
		);
	}

	constructor(props) {
		super(props);
		this.state = { time: { seconds: 0, minutes: 0 } };
	}

	componentDidMount() {
		const timer = setInterval(() => {
			let minutes = this.state.time.minutes;
			let seconds = this.state.time.seconds + 1;

			if (seconds > 59) {
				seconds = 0;
				minutes++;
			}

			this.setState({ time: { minutes, seconds } });
		}, 1000);

		this.setState({ timer });
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
	}

	formatTime() {
		// Returns a string in the format 00:00 (minutes : seconds)
		const { minutes, seconds } = this.state.time;
		let timeStr;

		if (minutes < 10) timeStr = `0${minutes}:`;
		else timeStr = `${minutes}:`;

		if (seconds < 10) timeStr += `0${seconds}`;
		else timeStr += seconds;

		return timeStr;
	}
}

import React from "react";

var Timer = React.createClass({
	
	getInitialState: function() {
		console.log("getInitialState");
		return {
			counter: parseInt(this.props.counter),
			interval: parseInt(this.props.interval)
		}
	},
	componentDidMount: function() {
		this.timer = setInterval(this.tick, this.state.interval)
	},
	componentWillUnmount: function() {
		clearInterval(this.timer);
	},
	tick: function() {
		this.setState({counter: this.state.counter + 1});
	},
	render: function() {
		return <p>Hello I am a <strong>Timer</strong><br />The value is: {this.state.counter}</p>;
	}

});

export default Timer;
import React from "react";
import {Nav, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Page1 from "components/page1";
import Page2 from "components/page2";

var App = React.createClass({

	getInitialState: function() {
	    return {
	          active: 1
	    };
	},

	handleSelect: function(eventKey) {
		this.setState({active: eventKey});
	},

	render: function() {
		let content = <Page1 />;
		if (this.state.active === 2) {
			content = <Page2 />;
		}

		return (
			<div>
				<nav>
					<Nav bsStyle="pills" activeKey={this.state.active} onSelect={this.handleSelect}>
						<NavItem eventKey={1}>Page 1</NavItem>
						<NavItem eventKey={2}>Page 2</NavItem>
					</Nav>
				</nav>
				<main>
					{ content }
				</main>
			</div>
		)
	}
});

export default App;
import React from "react";
import {Panel, Nav, NavItem} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Page1 from "components/page1";
import Page2 from "components/page2";
import GraphArea from "components/grapharea";
import * as Constants from "constants";

var App = React.createClass({

	getInitialState: function() {
	    return {
	          active: 1,
	          [Constants.INPUT_MONAT_NETTO]: "",
	          [Constants.INPUT_MONAT_AUSGABEN]: ""
	    };
	},

	componentWillMount: function() {
		this.page1Content = <Page1 onFormChange={this.onFormChange} getParentState={this.getParentState} />;
		this.page2Content = <Page2 onFormChange={this.onFormChange} getParentState={this.getParentState} />;
	},

	getParentState: function(key) {
		if (key == undefined) {
			return this.state;
		} else {
			return this.state[key];
		}
	},

	handleSelect: function(eventKey) {
		this.setState({active: eventKey});
	},

	onFormChange: function(key, value) {
		this.setState({[key]: value});
	},

	render: function() {
		let content = this.page1Content;
		if (this.state.active === 2) {
			content = this.page2Content;
		}

		return (
			<div>
				<nav>
					<Nav bsStyle="pills" activeKey={this.state.active} onSelect={this.handleSelect}>
						<NavItem eventKey={1}>Basisdaten</NavItem>
						<NavItem eventKey={2}>Page 2</NavItem>
					</Nav>
				</nav>
				<main>
					<GraphArea getParentState={this.getParentState} />
					<br /><br />
					{ content }
				</main>
			</div>
		)
	}
});

export default App;
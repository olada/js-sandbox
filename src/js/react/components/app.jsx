import React from "react";
import {Panel, Nav, NavItem} from "react-bootstrap";
import {Grid, Row, Col, LinkContainer} from "react-router-bootstrap";
import Page1 from "components/page1";
import Page2 from "components/page2";
import GraphArea from "components/grapharea";
import * as Constants from "constants";

var App = React.createClass({

	getInitialState: function() {
	    return {
	          active: 1,
	          monat_netto: 0,
	          monat_ausgaben: 0
	    };
	},

	componentWillMount: function() {
		this.page1Content = <Page1 />;
		this.page2Content = <Page2 />;
	},

	getParentState: function(key) {
		if (key == undefined) {
			return this.state;
		} else {
			return this.state[key];
		}
	},

	handleSelect: function(eventKey, event) {
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
				<GraphArea />
				<nav>
					<Nav bsStyle="pills" activeKey={this.state.active} onSelect={this.handleSelect}>
						<NavItem eventKey={1}>Kunden-Basisdaten</NavItem>
						<NavItem eventKey={2}>Krediteinstellungen</NavItem>
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
import React from "react";
import {Grid, Col, Row, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import Slider from "rc-slider";
import assign from 'object-assign';

import AppDispatcher from "dispatcher/appdispatcher";
import AppStore from "stores/appstore";
import * as Action from "constants/actions";
import * as Constants from "constants";
import * as Validator from "util/validators";

import App from "components/app"

var Page1 = React.createClass({

	getInitialState: function() {
		// Initialize states, so we don't get following warning:
		// FormControl is changing an uncontrolled input of type text to be controlled. 
		// Input elements should not switch from uncontrolled to controlled (or vice versa)
		return {
			monat_netto: 0,
			monat_ausgaben: 0,
			frei_verfuegbar_abs: 0,
			frei_verfuegbar_percent: 0,
			frei_verfuegbar_max: 0,
			frei_verfuegbar_set: false
		}
	},

	componentDidMount: function() {
		AppStore.addChangeListener(Action.MOD_BASISWERT, this.onBasiswertChange);
		this.readStates();
		this.forceUpdate();
	},

	readStates: function() {
		this.state = assign(this.state, AppStore.getAll());
		this.updateFreiVerfuegbar();
		console.log(this.state);
	},

	updateFreiVerfuegbar: function() {
		console.log("called");
		if (this.state.monat_netto > 0) {
			this.state.frei_verfuegbar_max = 
				this.state.monat_netto - this.state.monat_ausgaben;
		}
	},

	onBasiswertChange: function() {
		this.readStates();
		this.forceUpdate();
	},

	onChangeValue: function(event) {
		AppDispatcher.dispatch({
			action: Action.MOD_BASISWERT,
			key: event.target.id,
			value: event.target.value
		});
	},

	validateEinkommen: function() {
		if (Validator.validatePositiveInteger(this.state.monat_netto)){
			return "success";
		} else {
			return "error";
		}
	},

	validateAusgaben: function() {
		if (Validator.validatePositiveInteger(this.state.monat_ausgaben) &&
			parseInt(this.state.monat_ausgaben) <= parseInt(this.state.monat_netto)){
			return "success";
		} else {
			return "error";
		}
	},

	validateVerfuegbaresEinkommen: function() {
		if (Validator.validatePositiveInteger(this.state.frei_verfuegbar_abs)
			&& parseInt(this.state.frei_verfuegbar_abs) <= parseInt(this.state.frei_verfuegbar_max)) {
			return "success";
		} else {
			return "error";
		}
	},

	render: function() {
		return (
			<Grid>
				<Row>
					<Col md={5}>
						<FormGroup controlId="monat_netto" validationState={this.validateEinkommen()}>
							<ControlLabel>Monatliches Einkommen</ControlLabel>
							<FormControl type="text" value={this.state.monat_netto} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
					<Col md={5} mdOffset={2}> 
						<FormGroup controlId="monat_ausgaben" validationState={this.validateAusgaben()}>
							<ControlLabel>Monatliche Ausgaben</ControlLabel>
							<FormControl type="text" value={this.state.monat_ausgaben} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={5}>
						<FormGroup controlId="frei_verfuegbar_abs" validationState={this.validateVerfuegbaresEinkommen()}>
							<ControlLabel>Frei verfügbares Einkommen</ControlLabel>
							<FormControl type="text" value={this.state.frei_verfuegbar_abs} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
					<Col md={5} mdOffset={2}>
					</Col>
				</Row>
			</Grid>
		)
	}
});

export default Page1; 
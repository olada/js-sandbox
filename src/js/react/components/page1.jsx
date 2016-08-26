import React from "react";
import {Grid, Col, Row, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import Slider from "rc-slider";

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
			[Constants.INPUT_MONAT_NETTO]: 0,
			[Constants.INPUT_MONAT_AUSGABEN]: 0,
			[Constants.INPUT_FREI_VERFUEGBAR_ABS]: 0
		}
	},

	componentDidMount: function() {
		AppStore.addChangeListener(Action.MOD_BASISWERT, this.onBasiswertChange);
		this.readStates();
		this.forceUpdate();
	},

	readStates: function() {
		this.state = AppStore.getAll();
		console.log(this.state);
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
		})
	},

	validateEinkommen: function() {
		if (Validator.validatePositiveInteger(this.state[Constants.INPUT_MONAT_NETTO])){
			return "success";
		} else {
			return "error";
		}
	},

	validateAusgaben: function() {
		if (Validator.validatePositiveInteger(this.state[Constants.INPUT_MONAT_AUSGABEN])){
			return "success";
		} else {
			return "error";
		}
	},

	validateVerfuegbaresEinkommen: function() {
		if (Validator.validatePositiveInteger(this.state[Constants.INPUT_FREI_VERFUEGBAR_ABS])
			&& this.state[Constants.INPUT_FREI_VERFUEGBAR_ABS] <= this.state[Constants.INPUT_FREI_VERFUEGBAR_MAX]) {
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
						<FormGroup controlId={Constants.INPUT_MONAT_NETTO} validationState={this.validateEinkommen()}>
							<ControlLabel>Monatliches Einkommen</ControlLabel>
							<FormControl type="text" value={this.state[Constants.INPUT_MONAT_NETTO]} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
					<Col md={5} mdOffset={2}> 
						<FormGroup controlId={Constants.INPUT_MONAT_AUSGABEN} validationState={this.validateAusgaben()}>
							<ControlLabel>Monatliche Ausgaben</ControlLabel>
							<FormControl type="text" value={this.state[Constants.INPUT_MONAT_AUSGABEN]} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={5}>
						<FormGroup controlId={Constants.INPUT_FREI_VERFUEGBAR_ABS} validationState={this.validateVerfuegbaresEinkommen()}>
							<ControlLabel>Frei verfügbares Einkommen</ControlLabel>
							<FormControl type="text" value={this.state[Constants.INPUT_FREI_VERFUEGBAR_ABS]} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
					<Col md={5} mdOffset={2}>
						<ControlLabel>Slider</ControlLabel>
						<Slider />
					</Col>
				</Row>
			</Grid>
		)
	}
});

export default Page1; 
import React from "react";
import {FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import Slider from "rc-slider";

import * as Constants from "constants";
import * as Validator from "util/validators";

var Page1 = React.createClass({

	onChangeValue: function(event) {
		this.props.onFormChange(event.target.id, event.target.value);
		this.forceUpdate();
	},

	validateEinkommen: function() {
		if (Validator.validatePositiveInteger(this.props.getParentState(Constants.INPUT_MONAT_NETTO))){
			return "success";
		} else {
			return "error";
		}
	},

	validateAusgaben: function() {
		if (Validator.validatePositiveInteger(this.props.getParentState(Constants.INPUT_MONAT_AUSGABEN))){
			return "success";
		} else {
			return "error";
		}
	},

	render: function() {
		return (
			<div>
				<FormGroup controlId={Constants.INPUT_MONAT_NETTO} validationState={this.validateEinkommen()}>
					<ControlLabel>Monatliches Einkommen</ControlLabel>
					<FormControl type="text" value={this.props.getParentState(Constants.INPUT_MONAT_NETTO)} onChange={this.onChangeValue} />
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId={Constants.INPUT_MONAT_AUSGABEN} validationState={this.validateAusgaben()}>
					<ControlLabel>Monatliche Ausgaben</ControlLabel>
					<FormControl type="text" value={this.props.getParentState(Constants.INPUT_MONAT_AUSGABEN)} onChange={this.onChangeValue} />
					<FormControl.Feedback />
				</FormGroup>
				<FormGroup controlId={Constants.INPUT_MONAT_AUSGABEN} validationState={this.validateAusgaben()}>
					<ControlLabel>Frei verfügbares Einkommen</ControlLabel>
					<FormControl type="text" value={this.props.getParentState(Constants.INPUT_MONAT_AUSGABEN)} onChange={this.onChangeValue} />
					<FormControl.Feedback />
				</FormGroup>
				<Slider />
			</div>
		)
	}
});

export default Page1;
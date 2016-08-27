import React from "react";
import {Grid, Col, Row, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import Slider from "rc-slider";
import assign from 'object-assign';

import AppDispatcher from "dispatcher/appdispatcher";
import AppStore from "stores/appstore";
import * as Action from "constants/actions";
import * as Constants from "constants/constants";
import * as Validator from "util/validators";

import App from "components/app";
import Children from "components/children";

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
			frei_verfuegbar_set: false,
            children: []

        }
	},

	componentDidMount: function() {
		AppStore.addChangeListener(Action.MOD_BASISWERT, this.onBasiswertChange);
		AppStore.addChangeListener(Action.MOD_CHILDREN, this.onChildrenChange);
		this.readStates();
		this.forceUpdate();
	},

	readStates: function() {
		this.state = assign(this.state, AppStore.getAll());
		this.updateFreiVerfuegbar();
	},

	updateFreiVerfuegbar: function() {
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

    onChangeChildren: function(event) {
        AppDispatcher.dispatch({
            action: Action.MOD_CHILDREN,
            key: event.target.id,
            value: event.target.value
        })
    },

    onChangeChildAge: function(event) {
        AppDispatcher.dispatch({
            action: Action.MOD_CHILDREN_AGE,
            index: event.target.id,
            age: event.target.value
        })
    },

	validateIntegerNonZero: function(value) {
		if (Validator.validateIntegerNonZero(value)){
			return "success";
		} else {
			return "error";
		}
	},

	/*validateAusgaben: function() {
		if (Validator.validatePositiveInteger(this.state.monat_ausgaben) &&
			parseInt(this.state.monat_ausgaben) <= parseInt(this.state.monat_netto)){
			return "success";
		} else {
			return "error";
		}
	},*/

	validateVerfuegbaresEinkommen: function() {
		if (Validator.validatePositiveInteger(this.state.frei_verfuegbar_abs)
			&& parseInt(this.state.frei_verfuegbar_abs) <= parseInt(this.state.frei_verfuegbar_max)) {
			return "success";
		} else {
			return "error";
		}
	},

	render: function() {
        var that = this;

        return (
			<Grid>
				<Row>
					<Col md={5}>
						<FormGroup controlId="monat_netto" validationState={this.validateIntegerNonZero(this.state.monat_netto)}>
							<ControlLabel>Monatliches Einkommen</ControlLabel>
							<FormControl type="text" value={this.state.monat_netto} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
					<Col md={5} mdOffset={2}>
						<FormGroup controlId="monat_ausgaben" validationState={this.validateIntegerNonZero(this.state.monat_ausgaben)}>
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
						<FormGroup controlId="ausgaben_wohnung" validationState={this.validateIntegerNonZero(this.state.ausgaben_wohnung)}>
							<ControlLabel>Ausgaben: Wohnung</ControlLabel>
							<FormControl type="text" value={this.state.ausgaben_wohnung} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={5}>
						<FormGroup controlId={Constants.INPUT_CHILDREN}>
							<ControlLabel>Anzahl Kinder im Haushalt</ControlLabel>
							<FormControl type="text" value={this.state.children.length} onChange={this.onChangeChildren} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
					<Col md={5} mdOffset={2}>
						<FormGroup controlId="ausgaben_nebenkosten" validationState={this.validateIntegerNonZero(this.state.ausgaben_nebenkosten)}>
							<ControlLabel>Ausgaben: Nebenkosten</ControlLabel>
							<FormControl type="text" value={this.state.ausgaben_nebenkosten} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
				</Row>
				<Row>
                    <Col md={5} mdOffset={1}>
                    {this.state.children.map(function(children, i) {
                        return (
                            <Row key={'Child'+i}>
                                    <FormGroup controlId={i.toString()}>
                                        <ControlLabel>Alter Kind {i+1}</ControlLabel>
                                        <FormControl type="text" value={children.age} onChange={that.onChangeChildAge} />
                                        <FormControl.Feedback />
                                    </FormGroup>
                            </Row>
                            );
                        })}
                    </Col>
				</Row>
                <Children></Children>
			</Grid>
		)
	}
});

export default Page1;

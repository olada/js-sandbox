import React from "react";
import {Grid, Row, Col, FormGroup, ControlLabel, FormControl} from "react-bootstrap";
import AppStore from "stores/appstore";
import AppDispatcher from "dispatcher/appdispatcher";
import * as Action from "constants/actions";
import * as Validator from "util/validators"

var Page2 = React.createClass({
	getInitialState: function() {
		return {
			laufzeit: 5,
			jahreszins: 2,
            kreditbetrag: 10000
		}
	},
	componentDidMount: function() {
		AppStore.addChangeListener(Action.MOD_KREDITWERT, this.onKreditwertChange);
		this.state = AppStore.getAll();
		this.forceUpdate();
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(Action.MOD_KREDITWERT, this.onKreditwertChange);
	},

	onChangeValue: function(event) {
		AppDispatcher.dispatch({
			action: Action.MOD_KREDITWERT,
			key: event.target.id,
			value: event.target.value
		});
	},

	onKreditwertChange: function() {
		this.state.laufzeit = AppStore.get("laufzeit");
		this.state.jahreszins = AppStore.get("jahreszins");
        this.state.kreditbetrag = AppStore.get("kreditbetrag");
		this.forceUpdate();
	},

	validateLaufzeit: function() {
		return (Validator.validateIntegerNonZero(this.state.laufzeit)) ? "success" : "error";
	},

    validateKreditbetrag: function() {
        return (Validator.validateIntegerNonZero(this.state.kreditbetrag)) ? "success" : "error";
    },

	validateZins: function() {
		if (this.state.jahreszins >= 0) {
			return "success";
		} else {
			return "false";
		}
	},

	render: function() {
		return (
			<Grid>
				<Row>
					<Col md={5}>
						<FormGroup controlId="laufzeit" validationState={this.validateLaufzeit()}>
							<ControlLabel>Laufzeit (in Jahren)</ControlLabel>
							<FormControl type="text" value={this.state.laufzeit} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
					<Col md={5} mdOffset={2}>
						<FormGroup controlId="jahreszins" validationState={this.validateZins()}>
							<ControlLabel>Jahreszins (in %)</ControlLabel>
							<FormControl type="text" value={this.state.jahreszins} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md={5}>
						<FormGroup controlId="kreditbetrag" validationState={this.validateKreditbetrag()}>
							<ControlLabel>Kreditbetrag</ControlLabel>
							<FormControl type="text" value={this.state.kreditbetrag} onChange={this.onChangeValue} />
							<FormControl.Feedback />
						</FormGroup>
					</Col>
				</Row>
			</Grid>
		)
	}
});

export default Page2;

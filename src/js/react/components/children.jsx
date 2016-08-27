import React from "react";
import {Grid, Col, Row, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import Slider from "rc-slider";
import assign from 'object-assign';

import AppDispatcher from "dispatcher/appdispatcher";
import AppStore from "stores/appstore";
import * as Action from "constants/actions";
import * as Constants from "constants/constants";
import * as Validator from "util/validators";

var Children = React.createClass({

    getInitialState: function () {
        // Initialize states, so we don't get following warning:
        // FormControl is changing an uncontrolled input of type text to be controlled.
        // Input elements should not switch from uncontrolled to controlled (or vice versa)
        return {

            children: []

        }
    },

    componentDidMount: function () {
        AppStore.addChangeListener(Action.MOD_CHILDREN, this.onChildrenChange);
        this.setState({children: AppStore.getChildren()});
        this.forceUpdate();
    },


    onChildrenChange: function(event) {
        this.setState({children: AppStore.getChildren()});
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

    render: function () {
        var that = this;

        return (
            <Grid>
                <Row>
                    <Col md={5}>
                        <FormGroup controlId={Constants.INPUT_CHILDREN}>
                            <ControlLabel>Anzahl Kinder im Haushalt</ControlLabel>
                            <FormControl type="text" value={this.state.children.length}
                                         onChange={this.onChangeChildren}/>
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
                                    <FormControl type="text" value={children.age} onChange={that.onChangeChildAge}/>
                                    <FormControl.Feedback />
                                </FormGroup>
                            </Row>
                                );
                            })}
                    </Col>
                </Row>
            </Grid>
        )
    }
});

export default Children;


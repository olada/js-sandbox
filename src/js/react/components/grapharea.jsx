import React from "react";
import ReactHighcharts from "react-highcharts";
import {Panel} from "react-bootstrap";

import AppStore from "stores/appstore";
import * as Action from "constants/actions";
import * as Constants from "constants";

var GraphArea = React.createClass({

	getInitialState: function() {
		return {
			chart_config: {
				title: {
					text: 'Prognose'
				},
				subtitle: {
					text: '<strong style="color:#fc0;">Cofinpro</strong> Coding Dojo',
					useHTML: true
				},
			  	series: [{
				    type: 'line',
				    name: 'Average',
				    data: []
				}]
			}
		};
	},

	componentWillMount: function() {
	},

	componentDidMount: function() {
		AppStore.addChangeListener(Action.MOD_BASISWERT, this.onBasiswertChange);
	},

	onBasiswertChange: function() {
		let data_cumulative_income = [1, 2, 3, 4, 5].map(val => {
			return val * parseInt(AppStore.get(Constants.INPUT_MONAT_NETTO));
		});
		this.state.chart_config.series[0].data = data_cumulative_income;
		this.forceUpdate();
	},

	render: function() {
		return (
			<div id="graph">
				<ReactHighcharts config={this.state.chart_config} isPureConfig={false}></ReactHighcharts>
			</div>
		)
	}
});

export default GraphArea;
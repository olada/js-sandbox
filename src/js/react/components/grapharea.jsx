import React from "react";
import ReactHighcharts from "react-highcharts";
import {Panel} from "react-bootstrap";
import _ from "underscore";

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
				    type: 'spline',
				    name: 'Average',
				    data: []
				}],
				xAxis: {
					allowDecimals: false,
					max: 1
				}
			}
		};
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(Action.MOD_BASISWERT, this.onChange);
		AppStore.removeChangeListener(Action.MOD_KREDITWERT, this.onChange);
	},

	componentDidMount: function() {
		AppStore.addChangeListener(Action.MOD_BASISWERT, this.onChange);
		AppStore.addChangeListener(Action.MOD_KREDITWERT, this.onChange);
	},

	onChange: function() {

		let data_cumulative_income = _.range(0, parseInt(AppStore.get("laufzeit"))+1).map(function(index, value) {
			let item = Math.floor(
				value * parseInt(AppStore.get("monat_netto"))
					  * Math.pow(AppStore.get("jahreszins") / 100 + 1, index)
			);
			return item;
		});
		this.state.chart_config.series[0].data = data_cumulative_income;

		// Set X-Axis maximum
		this.state.chart_config.xAxis.max = parseInt(AppStore.get("laufzeit"));

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
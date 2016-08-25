import React from "react";
import ReactHighcharts from "react-highcharts";

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
				    data: [3, 5, 7, 9, 11]
				}]
			}
		};
	},

	componentWillMount: function() {
	},

	render: function() {
		let data_cumulative_income = [1, 2, 3, 4, 5].map(val => {
			return val * parseInt(this.props.getParentState(Constants.INPUT_MONAT_NETTO))
		});
		let chart_config = this.state.chart_config;
		chart_config.series[0].data = data_cumulative_income;
		return (
			<ReactHighcharts config={chart_config} isPureConfig={false}></ReactHighcharts>
		)
	}
});

export default GraphArea;
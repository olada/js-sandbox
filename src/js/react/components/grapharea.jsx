import React from "react";
import ReactHighcharts from "react-highcharts";
import {Panel} from "react-bootstrap";
import _ from "underscore";

import AppStore from "stores/appstore";
import * as Action from "constants/actions";
import * as Constants from "constants/constants";

var series_keys = {
	einkommen_kumulativ: 0,
	einkommen_monat: 1
}

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
			  	series: [
				  	{
					    type: 'spline',
					    name: 'Einkommen kum.',
					    data: []
					},
					{
						type: 'spline',
						name: 'Einkommen mtl.',
						data: []
					}
				],
				tooltip: {
					formatter: function() {
						return "Monat " + this.x;
					}
				},
				xAxis: {
					allowDecimals: false,
					max: 1,
					title: {
						text: 'Monate'
					}
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

		this.updateEinkommenKumulativ();
		this.updateEinkommenMonatlich();

		// Set X-Axis maximum
		this.state.chart_config.xAxis.max = parseInt(AppStore.get("laufzeit")) * Constants.MONTHS_IN_YEAR;

		this.forceUpdate();
	},

	updateEinkommenKumulativ: function() {
		let anzahl_monate = parseInt(AppStore.get("laufzeit")) * Constants.MONTHS_IN_YEAR;

		// + 1, weil das Array bei 0 beginnt
		let data_cumulative_income = _.range(0, anzahl_monate + 1).map(function(index, value) {
			let item = Math.floor(
				value * parseInt(AppStore.get("monat_netto"))
					  * Math.pow(AppStore.get("jahreszins") / 100 + 1, index)
			);
			return item;
		});
		this.state.chart_config.series[series_keys.einkommen_kumulativ].data = data_cumulative_income;
	},

	updateEinkommenMonatlich: function() {
		let anzahl_monate = parseInt(AppStore.get("laufzeit")) * Constants.MONTHS_IN_YEAR;

		let data_monthly_income = _.range(0, anzahl_monate + 1).map(function(index, value) {
			return parseInt(AppStore.get('monat_netto'));
		});
		this.state.chart_config.series[series_keys.einkommen_monat].data = data_monthly_income;	},

	render: function() {
		return (
			<div id="graph">
				<ReactHighcharts config={this.state.chart_config} isPureConfig={false}></ReactHighcharts>
			</div>
		)
	}
});

export default GraphArea;

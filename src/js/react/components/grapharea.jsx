import React from "react";
import ReactHighcharts from "react-highcharts";
import {Panel} from "react-bootstrap";
import _ from "underscore";

import AppStore from "stores/appstore";
import * as Action from "constants/actions";
import * as Constants from "constants/constants";

let date = new Date();

var series_keys = {
	einkommen_kumulativ: 0,
	einkommen_monat: 1,
    ausgaben_monat: 2,
    kreditbetrag: 3,
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
					    data: [],
					    color: '#0c0'
					},
					{
						type: 'spline',
						name: 'Einkommen mtl.',
						data: [],
						color: '#9f6'
					},
                    {
                        type: 'spline',
                        name: 'Ausgaben mtl.',
                        data: [],
                        color: '#c00'
                    },
                    {
                        type: 'spline',
                        name: 'Kreditbetrag mtl.',
                        data: []
                    }
				],
				tooltip: {
					formatter: function() {
						let monatOfYear = (date.getMonth() + this.x) % 12;
						let yearOffset = Math.floor((date.getMonth() + this.x) / 12);

						let monat = Constants.MONTHS[monatOfYear];
						let year = date.getFullYear() + yearOffset;
						return monat + " " + year + "<br />Geld: <strong>" + this.y + "€</strong>";
					}
				},
				xAxis: {
					allowDecimals: false,
					max: 1,
					title: {
						text: 'Monate'
					},
					plotLines: []
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
		this.updateAusgabenMonatlich();
        this.updateKreditbetrag();

        let monate_anzahl = parseInt(AppStore.get("laufzeit")) * Constants.MONTHS_IN_YEAR;

		// Set X-Axis maximum
		this.state.chart_config.xAxis.max = monate_anzahl;

		// Update vertical plot lines for years
		this.state.chart_config.xAxis.plotLines = [{width: 1, color: '#999', value: 2}, {value: 4}, {value: 6}];

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

	updateAusgabenMonatlich: function() {
		let anzahl_monate = parseInt(AppStore.get("laufzeit")) * Constants.MONTHS_IN_YEAR;

		let data_monthly_ausgaben = _.range(0, anzahl_monate + 1).map(function(index, value) {
			return parseInt(AppStore.get('monat_ausgaben'));
		});
		this.state.chart_config.series[series_keys.ausgaben_monat].data = data_monthly_ausgaben;	},

    updateKreditbetrag: function() {
        let anzahl_monate = parseInt(AppStore.get("laufzeit")) * Constants.MONTHS_IN_YEAR;
        let kreditbetrag = AppStore.getCalculated("gesamtKreditBetrag");
        let tilgungsrate = AppStore.getCalculated("rate");

        let data_monthly_Kreditbetrag = _.range(0, anzahl_monate + 1).map(function(index, value) {
            return kreditbetrag - (index*tilgungsrate);
        });
        this.state.chart_config.series[series_keys.kreditbetrag].data = data_monthly_Kreditbetrag;	},

	render: function() {
		return (
			<div id="graph">
				<ReactHighcharts config={this.state.chart_config} isPureConfig={false}></ReactHighcharts>
			</div>
		)
	}
});

export default GraphArea;

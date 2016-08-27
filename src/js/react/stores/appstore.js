import EventEmitter from "events";
import AppDispatcher from "dispatcher/appdispatcher";
import _ from "underscore";


import * as Action from "constants/actions";
import assign from "object-assign/index";

var values = {
	laufzeit: 0,
	jahreszins: 0,
    kreditbetrag: 0,
    tilgungssatz: 2
};
let children = [];
let calculated = {
    jahreszins: 0,
    tilgungsrate: 0,
    zinsfaktor: 0,
    rate: 0,
    ausgaben: []
};

const childCost = [
    {age: 6, cost: 519},
    {age: 12, cost: 604},
    {age: 18, cost: 700}
];

function updateAusgaben() {
    let laufzeitMonate = parseInt(values.laufzeit) * 12;

    let ausgaben = _.range(0, laufzeitMonate).map(function(index, value) {
        let mtlAusgaben = parseInt(values.monat_ausgaben);
        // check kinder
        let year = Math.floor(index/12);
        let totalChildCost = 0;
        children.forEach(function(children) {
            var actualAge = parseInt(children.age) + year;
            for (var costEntry of childCost) {
                if (actualAge <= costEntry.age) {
                    totalChildCost += costEntry.cost;
                    break;
                }
            }
        });
        mtlAusgaben += totalChildCost;

        return mtlAusgaben;
    });

    calculated.ausgaben = ausgaben;
}


function updateCalculatedValues() {
    let zinsfaktor = Math.pow(parseInt(values.jahreszins) / 100 + 1, 1/12);
    let laufzeitMonate = parseInt(values.laufzeit) * 12;
    let rate = parseFloat(values.kreditbetrag) *
    			parseFloat(Math.pow(zinsfaktor, laufzeitMonate)) / parseFloat(Math.pow(zinsfaktor, laufzeitMonate) - 1) *
    			parseFloat(zinsfaktor - 1);
    let totalKreditBetrag = rate * laufzeitMonate;
    let tilgungsrate = values.tilgungssatz;

    calculated.gesamtKreditBetrag = totalKreditBetrag;
    calculated.rate = rate;
	calculated.zinsfaktor = zinsfaktor;
}

function validate(key, value) {
	switch (key) {
		case "laufzeit":
			if (value > 50) { value = 50; }
			break;
	}

	return value;
}

let AppStore = assign({}, EventEmitter.prototype, {
	get: function(key) {
		return values[key];
	},
	getCalculated: function(key) {
		return calculated[key];
	},
	getAll: function() {
		return values;
	},
    getChildren: function() {
        return children;
    },
	set: function(key, value) {
		value = validate(key, value);
		values[key] = value;
		console.log(values);
	},
    setChildAge: function(index, value) {
        children[index].age = value;
    },
	addChangeListener: function(action, callback) {
		this.on(action, callback);
	},
	removeChangeListener: function(action, callback) {
		this.removeListener(action, callback);
	},
	emitChange: function(action) {
		this.emit(action);
	}
});

// Register callback to handle all dispatcher updates
AppDispatcher.register(function(payload) {
	switch (payload.action) {
		case Action.MOD_BASISWERT:
			AppStore.set(payload.key, payload.value);
            updateAusgaben();
			AppStore.emitChange(Action.MOD_BASISWERT);
			break;
		case Action.MOD_KREDITWERT:
			AppStore.set(payload.key, payload.value);
			updateCalculatedValues();
			updateAusgaben();
			AppStore.emitChange(Action.MOD_KREDITWERT);
			break;
        case Action.MOD_CHILDREN:
            var countChildren = payload.value;
            children = [];
            while (countChildren > 0) {
                var child = {age: 1};
                children.push(child);
                countChildren--;
            }
            AppStore.set('children', children);
            updateCalculatedValues();
            updateAusgaben();
            AppStore.emitChange(Action.MOD_CHILDREN);
            break;
        case Action.MOD_CHILDREN_AGE:
            AppStore.setChildAge(payload.index, payload.age);
            updateCalculatedValues();
            updateAusgaben();
            AppStore.emitChange(Action.MOD_CHILDREN);
            break;
	}
});

export default AppStore;


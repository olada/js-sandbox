import EventEmitter from "events";
import AppDispatcher from "dispatcher/appdispatcher";

import * as Action from "constants/actions";
import assign from "object-assign/index";

var values = {
	laufzeit: 0,
	jahreszins: 0,
    kreditbetrag: 0
};
let children = {};
let calculated = {
    jahreszins: 0,
    tilgungsrate: 0
};
var ausgaben = [];

function updateCalculatedValues() {
    let zinsfaktor = Math.pow(parseInt(values.jahreszins) / 100 + 1, 1/12);
    let laufzeitMonate = parseInt(values.laufzeit) * 12;
    let rate = parseFloat(values.kreditbetrag) *
    			parseFloat(Math.pow(zinsfaktor, laufzeitMonate)) / parseFloat(Math.pow(zinsfaktor, laufzeitMonate) - 1) *
    			parseFloat(zinsfaktor - 1);
    let totalKreditBetrag = rate * laufzeitMonate;

    calculated.gesamtKreditBetrag = totalKreditBetrag;
    calculated.rate = rate;
	calculated.zinsfaktor = zinsfaktor;
}

function validate(key, value) {
	switch (key) {
		case "laufzeit":
			if (value > 10) { value = 10; }
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
			AppStore.emitChange(Action.MOD_BASISWERT);
			break;
		case Action.MOD_KREDITWERT:
			AppStore.set(payload.key, payload.value);
			updateCalculatedValues();
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
            AppStore.emitChange(Action.MOD_CHILDREN);
            break;
        case Action.MOD_CHILDREN_AGE:
            AppStore.setChildAge(payload.index, payload.age);
            AppStore.emitChange(Action.MOD_CHILDREN);
            break;
	}
});

export default AppStore;


import EventEmitter from "events";
import AppDispatcher from "dispatcher/appdispatcher";
import * as Action from "constants/actions";
import assign from "object-assign/index";

let values = {
	laufzeit: 0,
	jahreszins: 0
};
let children = {};


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
			AppStore.emitChange(Action.MOD_KREDITWERT);
			break;
        case Action.MOD_CHILDREN:
            var countChildren = payload.value;
            children = [];
            while (countChildren > 0) {
                var child = {age: 0};
                children.push(child);
                countChildren--;
            }
            AppStore.set('children', children);
            AppStore.emitChange(Action.MOD_CHILDREN);
            break;
	}
});

export default AppStore;


import EventEmitter from "events";
import AppDispatcher from "dispatcher/appdispatcher";
import * as Action from "constants/actions";
import * as Constant from "constants";
import assign from "object-assign/index";

let values = {};

let AppStore = assign({}, EventEmitter.prototype, {
	get: function(key) {
		return values[key];
	},
	getAll: function() {
		return values;
	},
	set: function(key, value) {
		values[key] = value;
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
	console.log("registering appstore");
	switch (payload.action) {
		case Action.MOD_BASISWERT:
			AppStore.set(payload.key, payload.value);
			AppStore.emitChange(Action.MOD_BASISWERT);
			break;
		case Action.SOMETHING:
			AppStore.emitChange(Action.SOMETHING);
	}
});

export default AppStore;
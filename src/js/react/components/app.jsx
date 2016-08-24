import React from "react";
import Timer from "components/timer";

console.log("FOO");

var App = React.createClass({
	
	render: function() {
		return <Timer counter="0" interval="1000" />;
	}
});

export default App;
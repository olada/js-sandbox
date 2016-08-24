// Including CSS
require("css/styles.scss");

import React from "react"; // Because JSX is translated into React.<API> calls
import {render} from "react-dom";

// Components
import App from "components/app";

console.log("hello world");

render(<App />, document.getElementById("app"));


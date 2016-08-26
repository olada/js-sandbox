// Including CSS
require("css/bootstrap.min.css");
require("css/bootstrap-theme.min.css");
require("css/styles.scss");
require('rc-slider/assets/index.css');

import React from "react"; // Because JSX is translated into React.<API> calls
import {render} from "react-dom";

// Components
import App from "components/app";

render(<App />, document.getElementById("app"));


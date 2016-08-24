// Including CSS
require("css/styles.scss");

import React from "react"; // Because JSX is translated into React.<API> calls
import {render} from "react-dom";

// Components
import App from "components/app";

render(<App />, document.getElementById("app"));


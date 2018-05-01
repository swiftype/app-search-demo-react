import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "styled-components";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; }
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();

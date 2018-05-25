import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/styles.css";

ReactDOM.render(<App />, document.getElementById("app-container"));
registerServiceWorker();

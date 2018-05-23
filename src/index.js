import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import wavesImage from "./images/bg--waves-crop.jpg";
import "./styles/styles.css";

ReactDOM.render(<App />, document.getElementById("app-container"));
registerServiceWorker();

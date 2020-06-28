import React from "react";
//1.take care of rendering main app component
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//2.here is where the rendering happens the functions call take on what to render <APP/> and we render it to root div in the index.html file
//meanning we are taking the root div and we puting it into the <APP/> component
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import GameDisplay from "./components/GameDisplay";
import NotFound from './components/NotFound';
import * as serviceWorker from "./serviceWorker";
import "./index.css";

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/:gameID" component={GameDisplay} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  routing
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
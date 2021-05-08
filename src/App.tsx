import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from './components/Homepage'
import Game from './components/Game'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/game">
          <Game />
        </Route><Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

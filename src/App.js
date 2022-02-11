import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorsHelpers";

import seedColors from "./seedColors";
import Palette from "./components/Palette";

import "./App.css";
export default class App extends Component {
  static defaultProps = {
    seedColors,
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>PALETTE LIST GOES HERE</h1>} />
        <Route
          exact
          path="/palette/:id"
          render={() => <h1>INDIVIDUAL PALETTE</h1>}
        />
      </Switch>
      // <div className="App"><
      //     <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

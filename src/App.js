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
  constructor(props) {
    super(props);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>PALETTE LIST GOES HERE</h1>} />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
      // <div className="App"><
      //     <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

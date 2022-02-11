import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorsHelpers";

import seedColors from "./seedColors";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";

import "./App.css";
export default class App extends Component {
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
        <Route
          exact
          path="/"
          render={() => <PaletteList palettes={seedColors} />}
        />
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

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorsHelpers";

import seedColors from "./seedColors";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";

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
          path="/palette/new"
          render={(routeProps) => <NewPaletteForm {...routeProps} />}
        />
        <Route
          exact
          path="/palette/:paletteID/:colorID"
          render={(routeProps) => (
            <SingleColorPalette
              colorID={routeProps.match.params.colorID}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteID)
              )}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList palettes={seedColors} {...routeProps} />
          )}
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
    );
  }
}

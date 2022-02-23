import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorsHelpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import seedColors from "./seedColors";

import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";

import "./App.css";
export default class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors,
    };
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id) {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  }
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }
  deletePalette(id) {
    this.setState(
      {
        palettes: this.state.palettes.filter((palette) => palette.id !== id),
      },
      this.syncLocalStorage
    );
  }
  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={(routeProps) => (
                    <div className="page">
                      <NewPaletteForm
                        {...routeProps}
                        savePalette={this.savePalette}
                        palettes={this.state.palettes}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteID/:colorID"
                  render={(routeProps) => (
                    <div className="page">
                      <SingleColorPalette
                        colorID={routeProps.match.params.colorID}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteID)
                        )}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={(routeProps) => (
                    <div className="page">
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={(routeProps) => (
                    <div className="page">
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

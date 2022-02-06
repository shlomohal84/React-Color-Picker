import React, { Component } from "react";
import "./App.css";

import { generatePalette } from "./colorsHelpers";

import seedColors from "./seedColors";
import Palette from "./components/Palette";


export default class App extends Component {
  static defaultProps = {
    seedColors
  }

  render() {

    return (
      <div className="App">
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    );
  }
}

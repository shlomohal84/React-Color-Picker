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
    console.log(generatePalette(seedColors[4]))
    return (
      <div className="App">
        <Palette {...seedColors[4]} />
      </div>
    );
  }
}

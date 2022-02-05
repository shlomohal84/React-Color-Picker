import React, { Component } from "react";
import "./App.css";

import seedColors from "./seedColors";
import Palette from "./components/Palette";


export default class App extends Component {


  render() {

    return (
      <div className="App">
        <Palette {...seedColors[4]} />
      </div>
    );
  }
}

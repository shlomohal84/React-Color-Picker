import React, { Component } from "react";
import "flag-icons/css/flag-icons.css";

import Navbar from "./Navbar";
import ColorBox from "./ColorBox";

import "./Palette.css";
export default class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: "hex" };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeLevel(level) {
    this.setState({ level });
  }
  changeFormat(val) {
    this.setState({ format: val });
  }
  render() {
    const { colors, paletteName, emoji, isWindowsEmoji } = this.props.palette;
    const { level, format } = this.state;
    console.log(this.props.palette.isWindowsEmoji);

    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        key={color.id}
        background={color[format]}
        name={color.name}
        changeLevel={this.changeLevel}
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <footer className="Palette-footer">
          {paletteName}
          {isWindowsEmoji ? (
            <span className="emoji">{emoji}</span>
          ) : (
            <span className={`emoji fi fi-${emoji.toLowerCase()}`}></span>
          )}
        </footer>
      </div>
    );
  }
}

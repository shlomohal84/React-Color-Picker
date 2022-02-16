import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = { format: "hex" };

    this._shades = this.gatherShades(this.props.palette, this.props.colorID);
    this.gatherShades = this.gatherShades.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeFormat(val) {
    this.setState({ format: val });
  }

  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }
  render() {
    const { paletteName, emoji, isWindowsEmoji, id } = this.props.palette;
    const { format } = this.state;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[format]}
        showingFullPalette={false}
      />
    ));
    return (
      <div className="SingleColorPalette Palette">
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className="Palette-colors">
          {colorBoxes}
          <div className="go-back ColorBox">
            <Link to={`/palette/${id}`} className="back-button">
              Go Back
            </Link>
          </div>
        </div>
        <PaletteFooter
          paletteName={paletteName}
          emoji={emoji}
          isWindowsEmoji={isWindowsEmoji}
        />
      </div>
    );
  }
}

export default SingleColorPalette;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";

const styles = {
  Palette: {
    height: "100vh",
    overflow: "hidden",
    flexDirection: "column",
  },
  colors: {
    height: "90%",
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: " -3.5px auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
      color: "white",
      background: " rgba(255, 255, 255, 0.3)",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: " 50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none",
    },
  },
};

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
    const { classes } = this.props;
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
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} showingAllColors={false} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>Go Back</Link>
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

export default withStyles(styles)(SingleColorPalette);

import { useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";

import styles from "./styles/PaletteStyles";

const SingleColorPalette = ({ palette, colorID, classes }) => {
  const { paletteName, emoji, isWindowsEmoji, id } = palette;
  const [format, setFormat] = useState("hex");

  function changeFormat(val) {
    setFormat(val);
  }

  function gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }
  const _shades = gatherShades(palette, colorID);

  const colorBoxes = _shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));
  return (
    <div className={classes.Palette}>
      <Navbar handleChange={changeFormat} showingAllColors={false} />
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
};

export default withStyles(styles)(SingleColorPalette);

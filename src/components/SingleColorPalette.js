import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "@mui/material";

import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";

import styles from "./styles/PaletteStyles";

const SingleColorPalette = ({ palette, classes }) => {
  const { paletteName, emoji, isWindowsEmoji } = palette;

  const [format, setFormat] = useState("hex");

  const { colorID, paletteID } = useParams();
  function changeFormat(val) {
    setFormat(val);
  }

  function gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette(paletteID).colors;
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
          <Link to={`/palette/${paletteID}`}>Go Back</Link>
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

export default styled(styles)(SingleColorPalette);

import { useState } from "react";
import { withStyles } from "@material-ui/styles";

import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";

import "flag-icons/css/flag-icons.css";
import styles from "./styles/PaletteStyles";

const Palette = ({
  classes,
  palette,
  paletteName,
  emoji,
  isWindowsEmoji,
  id,
}) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  function changeLevel(level) {
    setLevel(level);
  }
  function changeFormat(val) {
    setFormat(val);
  }

  const colorBoxes = palette.colors[level].map((color) => (
    <ColorBox
      key={color.id}
      background={color[format]}
      name={color.name}
      changeLevel={changeLevel}
      moreUrl={`/palette/${palette.id}/${color.id}`}
      showingFullPalette={true}
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar
        level={level}
        changeLevel={changeLevel}
        handleChange={changeFormat}
        showingAllColors={true}
      />
      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter
        paletteName={paletteName}
        emoji={emoji}
        isWindowsEmoji={isWindowsEmoji}
      />
    </div>
  );
};
export default withStyles(styles)(Palette);

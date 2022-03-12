import { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "./Navbar";
import ColorBox from "./ColorBox";
import PaletteFooter from "./PaletteFooter";

import "flag-icons/css/flag-icons.css";
import styles from "./styles/PaletteStyles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => styles);

const Palette = ({ palette, paletteName, emoji, isWindowsEmoji }) => {
  const classes = useStyles();
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  function changeLevel(level) {
    setLevel(level);
  }
  function changeFormat(val) {
    setFormat(val);
  }
  const { paletteID } = useParams();
  const colorBoxes = palette(paletteID).colors[level].map((color) => (
    <ColorBox
      key={color.id}
      colorID={color.id}
      background={color[format]}
      name={color.name}
      changeLevel={changeLevel}
      moreUrl={`/palette/${paletteID}/${color.id}`}
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
        paletteName={palette(paletteID).paletteName}
        emoji={palette(paletteID).emoji}
        isWindowsEmoji={palette(paletteID).isWindowsEmoji}
      />
    </div>
  );
};
export default Palette;

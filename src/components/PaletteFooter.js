import React from "react";

import styles from "./styles/PaletteFooterStyles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => styles);

function PaletteFooter(props) {
  const { paletteName, emoji, isWindowsEmoji } = props;
  const classes = useStyles();

  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      {isWindowsEmoji ? (
        <span className={classes.emoji}>{emoji}</span>
      ) : (
        <span
          className={`${classes.emoji} fi fi-${String(emoji).toLowerCase()}`}
        ></span>
      )}
    </footer>
  );
}
export default PaletteFooter;

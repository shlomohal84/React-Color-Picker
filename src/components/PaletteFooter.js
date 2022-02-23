import React from "react";
import { withStyles } from "@material-ui/styles";

import styles from "./styles/PaletteFooterStyles";

function PaletteFooter(props) {
  const { paletteName, emoji, isWindowsEmoji } = props;
  const { classes } = props;
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
export default withStyles(styles)(PaletteFooter);

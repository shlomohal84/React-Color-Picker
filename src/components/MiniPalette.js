import React from "react";
import "flag-icons/css/flag-icons.css";

import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";

function MiniPalette(props) {
  const { classes, paletteName, emoji, isWindowsEmoji, colors } = props;
  const miniColorBoxes = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName}
        {isWindowsEmoji ? (
          <span className={classes.emoji}>{emoji}</span>
        ) : (
          <span
            className={`${classes.emoji} fi fi-${String(emoji).toLowerCase()}`}
          ></span>
        )}
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);

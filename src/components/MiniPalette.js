import React from "react";
import "flag-icons/css/flag-icons.css";
import DeleteIcon from "@material-ui/icons/Delete";

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
      <div className={classes.delete}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s ease-in-out" }}
        />
      </div>
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

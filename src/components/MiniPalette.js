import React, { Component } from "react";
import "flag-icons/css/flag-icons.css";
import DeleteIcon from "@material-ui/icons/Delete";

import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(evt) {
    evt.stopPropagation();
    this.props.deletePalette(this.props.id);
  }
  render() {
    const { classes, paletteName, emoji, isWindowsEmoji, colors, handleClick } =
      this.props;

    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    return (
      <div className={classes.root} onClick={handleClick}>
        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={this.handleDelete}
        />
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName}
          {isWindowsEmoji ? (
            <span className={classes.emoji}>{emoji}</span>
          ) : (
            <span
              className={`${classes.emoji} fi fi-${String(
                emoji
              ).toLowerCase()}`}
            ></span>
          )}
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);

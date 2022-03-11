import { memo } from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";

import "flag-icons/css/flag-icons.css";
import styles from "./styles/MiniPaletteStyles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => styles);
const MiniPalette = ({
  paletteName,
  emoji,
  isWindowsEmoji,
  colors,
  id,
  toggleDialog,
  goToPalette,
}) => {
  const classes = useStyles();
  function handleDelete(evt) {
    evt.stopPropagation();
    toggleDialog(id);
  }
  function handleClick() {
    goToPalette(id);
  }
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
        onClick={handleDelete}
      />
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
};

export default memo(MiniPalette);

import React from "react";
import { withStyles } from "@material-ui/styles";
import "flag-icons/css/flag-icons.css";

const styles = {
  root: {
    backgroundColor: "white",
    borderRadious: "5px",
    padding: "0.5rem",
    position: "relative",
    overFlow: "hidden",
    border: "1px solid black",
    "&:hover": {
      crusor: "pointer",
    },
  },
  colors: {
    backgroundColor: "grey",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
};

function MiniPalette(props) {
  const { classes, paletteName, emoji, isWindowsEmoji } = props;
  return (
    <div className={classes.root}>
      <div className={classes.colors} />
      <h5 className={classes.title}>
        {paletteName}
        {isWindowsEmoji ? (
          <span className={classes.emoji}>{emoji}</span>
        ) : (
          <span
            className={`${classes.emoji} fi fi-${props.emoji.toLowerCase()}`}
          ></span>
        )}
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);

{
  /* {isWindowsEmoji ? (
          <span className="emoji">{emoji}</span>
        ) : (
          <span className={`emoji fi fi-${emoji.toLowerCase()}`}></span>
        )} */
}

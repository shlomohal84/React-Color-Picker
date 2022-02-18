import React from "react";
import { withStyles } from "@material-ui/styles";
const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: " -3.5px auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
  },
};

function DraggableColorBox(props) {
  const { classes } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: props.color }}>
      {props.color}
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);

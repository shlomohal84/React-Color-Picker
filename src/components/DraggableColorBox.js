import React, { useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { SortableElement } from "react-sortable-hoc";

import styles from "./styles/DraggableColorBoxStyles";
import { makeStyles } from "@mui/styles";

const DraggableColorBox = SortableElement((props) => {
  const ref = useRef("ref");

  const useStyles = makeStyles((theme) => styles(props));
  const classes = useStyles();
  const { handleClick, name, color } = props;
  return (
    <div ref={ref} className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span className={classes.colorName}>{name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => handleClick(props.name)}
        />
      </div>
    </div>
  );
});

export default DraggableColorBox;

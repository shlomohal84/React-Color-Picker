import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  styled,
  Dialog,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
} from "@mui/material";
import { Check as CheckIcon, Cancel as CloseIcon } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";

import MiniPalette from "./MiniPalette";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./styles/PaletteListStyles";

const PaletteList = ({ palettes, classes, deletePalette, history }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteingID, setDeletingID] = useState("");

  const navigate = useNavigate();
  function goToPalette(id) {
    navigate(`/palette/${id}`);
  }

  function toggleDialog(id) {
    setOpenDeleteDialog(!openDeleteDialog);
    setDeletingID(!openDeleteDialog ? id : "");
  }
  function handleDelete() {
    deletePalette(deleteingID);
    toggleDialog();
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                {...palette}
                goToPalette={goToPalette}
                toggleDialog={toggleDialog}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="delete-dialog-title"
        onClose={toggleDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete"></ListItemText>
          </ListItem>
          <ListItem button onClick={toggleDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel"></ListItemText>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default styled(styles)(PaletteList);

import { useState } from "react";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AddToPhotos as AddToPhotosIcon } from "@mui/icons-material";

import PaletteMetaForm from "./PaletteMetaForm";
import classNames from "classnames";
import styles from "./styles/PaletteFormNavStyles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => styles);

const PaletteFormNav = ({ open, palettes, handleSubmit, handleDrawerOpen }) => {
  const classes = useStyles();

  const [formShowing, setFormShowing] = useState(false);

  function toggleShowForm() {
    setFormShowing(!formShowing);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="default"
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={toggleShowForm}
          >
            Save
          </Button>
          <Link to="/">
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          toggleShowForm={toggleShowForm}
        />
      )}
    </div>
  );
};

export default PaletteFormNav;

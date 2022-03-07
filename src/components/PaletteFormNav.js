import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Button from "@material-ui/core/Button";

import PaletteMetaForm from "./PaletteMetaForm";

import styles from "./styles/PaletteFormNavStyles";
const PaletteFormNav = ({
  classes,
  open,
  palettes,
  handleSubmit,
  handleDrawerOpen,
}) => {
  // const [newPaletteName, setNewPaletteName] = useState("");
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

export default withStyles(styles, { withTheme: true })(PaletteFormNav);

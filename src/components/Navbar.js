import { useState } from "react";
import { Link } from "react-router-dom";
import { Select, MenuItem, Snackbar, IconButton } from "@mui/material";
import { Cancel as CancelIcon } from "@mui/icons-material";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => styles);
const Navbar = ({ handleChange, level, changeLevel, showingAllColors }) => {
  const classes = useStyles();
  const [format, setFormat] = useState("hex");
  const [open, setOpen] = useState(false);

  function handleFormatChange(evt) {
    setFormat(evt.target.value);
    setOpen(true);
    handleChange(evt.target.value);
  }
  const closeSnackbar = (event, reason) => {
    setOpen(false);
  };

  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/">reactcolorpicker</Link>
      </div>
      {showingAllColors && (
        <div>
          <span>Level: {level}</span>
          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
      )}
      <div className={classes.selectContainer}>
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255,1)</MenuItem>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format Changed To: {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClose={closeSnackbar}
        action={[
          <IconButton
            onClick={closeSnackbar}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CancelIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
};

export default Navbar;

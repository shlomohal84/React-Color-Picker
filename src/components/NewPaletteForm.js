import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, Typography, Divider, IconButton, Button } from "@mui/material";
import classNames from "classnames";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { arrayMove } from "react-sortable-hoc";
import DraggableColorList from "./DraggableColorList";

import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

import seedColors from "../seedColors";
import styles from "./styles/NewPaletteFormStyles";
import { makeStyles } from "@mui/styles";

const NewPaletteForm = (maxColors = 20, palettes, savePalette) => {
  const useStyles = makeStyles(() => styles);
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const navigate = useNavigate();
  function handleDrawerOpen() {
    setOpen(true);
  }
  function handleDrawerClose() {
    setOpen(false);
  }

  function addNewColor(newColor) {
    setColors([...colors, newColor]);
  }

  function handleSubmit(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
    newPalette.isWindowsEmoji = true;
    savePalette(newPalette);
    navigate("/");
  }
  function removeColor(colorName) {
    setColors(colors.filter((color) => color.name !== colorName));
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };
  function clearPalette() {
    setColors([]);
  }

  function addRandomColor() {
    const allColors = seedColors.map((p) => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      let tempRandomColor = allColors[rand];
      randomColor = tempRandomColor;
      isDuplicateColor = colors.some(
        (color) => color.name === tempRandomColor.name
      );
    }
    setColors([...colors, randomColor]);
  }

  const paletteIsFull = colors.length >= maxColors;
  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={handleSubmit}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearPalette}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>

          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={addNewColor}
            colors={colors}
          />
        </div>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
      </main>
    </div>
  );
};
export default NewPaletteForm;
